import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { WorkerStateService } from 'src/modules/Worker/services/State';
import { WorkerStateObject } from 'src/types';
import { forwardRef, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';

import { PubSub } from 'graphql-subscriptions';
import { PermissionsService, ProjectService } from 'src/modules/Project/services';
import { AuthService } from 'src/modules/Auth/services';
import { EPermission, EWorkerState, WORKERSTATE_SUBSCRIPTION_NAME } from '@app/shared';

@Resolver(of => WorkerStateObject)
export class WorkerStateResolver {
  constructor(
    private readonly stateService: WorkerStateService,
    private readonly projectService: ProjectService,
    private readonly permissionsService: PermissionsService,
    private readonly authService: AuthService,

    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  // subscribe WorkerState
  @Subscription((returns) => WorkerStateObject, {
    filter: (payload, variables) => {
      return payload.projectId = variables.projectId
    },

    // Resolve function
    async resolve(this: WorkerStateResolver, { projectId }) {
      return await this.buildWorkerState(projectId);
    },
  
    name: WORKERSTATE_SUBSCRIPTION_NAME,
  })
  async workerStateUpdated(
    @Args('projectId') projectId: string,
    @Args('token') token: string,
  ) {
    // Trying to login using this token
    if (token.length > 16) {
      // Getting worker with this token
      const worker = await this.stateService.fetchByToken(token);
      if (!worker) throw new HttpException(`Worker with token ${token} not found`, HttpStatus.NOT_FOUND);

      // Checking if this worker assigned to this project
      if (worker.projectId != projectId) throw new HttpException(`Worker (_id: ${worker.workerId}) is not assigned to project (_id: ${projectId})`, HttpStatus.UNAUTHORIZED);
    } else {
      // User token
      const profile = await this.authService.authorize(token);
      if (profile == null) throw new HttpException('Unknown token', HttpStatus.FORBIDDEN);

      // Checking if this user have access
      // to view WorkerState
      const members = await this.projectService.fetchMembers(projectId);
      const member = members.find((x) => String(x.uid) == String(profile._id));
      if (!member) throw new HttpException(`This profile (_id: ${profile._id}) does not belong to this project (_id: ${projectId})`, HttpStatus.FORBIDDEN);
      
      // Checking permissions
      const permissions = this.permissionsService.createForPermissions(member.permissions?.list ?? []);
      if (!permissions.has(EPermission.SUBSCRIBE_TO_WORKER_STATE)) throw new HttpException(`This profile (_id: ${profile._id}) doesn't have ${EPermission.SUBSCRIBE_TO_WORKER_STATE} permission`, HttpStatus.FORBIDDEN);
    };

    // Sending basic workerState information
    setTimeout(async () => {
      this.pubSub.publish(WORKERSTATE_SUBSCRIPTION_NAME, { projectId });

      // Updating state 
      if (token.length > 16) {
        await this.stateService.setState(projectId, EWorkerState.RUNNING);
      };
    }, 1000)

    // Returning asyncIterator
    return this.pubSub.asyncIterator(WORKERSTATE_SUBSCRIPTION_NAME);
  };

  // private buildWorkerState
  private async buildWorkerState(projectId: string): Promise<WorkerStateObject> {
    // Building WorkerStateObject
    const project = await this.projectService.fetchById(projectId);
    if (!project) throw new HttpException(`Project with this id (${projectId}) does not exists`, HttpStatus.NOT_FOUND);

    // Resolving worker state
    const state = await this.stateService.getState(project._id);
    const region = await this.stateService.getRegion(project._id);

    // Ask WorkerState service to provision new container is state is dead
    if (state == EWorkerState.DEAD) {
      this.stateService.createWorker(project._id);
    };

    const address = project.settings.server.address;

    return {
      state,
      address,
      region,
      project,

      // +todo fetch plugins
      plugins: [],
    }
  };
};
