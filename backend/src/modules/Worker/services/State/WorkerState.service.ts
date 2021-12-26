import { EWorkerState, IWorkerRegion, WORKERSTATE_SUBSCRIPTION_NAME } from '@app/shared';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IRegion, RegionsListService } from 'src/modules/Region/services';
import { PubSub } from 'graphql-subscriptions';

import { Types } from 'mongoose';

// RawWorker interface
interface RawWorker {
  workerId: string,
  projectId: string,

  token: string,
  
  state: EWorkerState,
  region: string,
};

@Injectable()
export class WorkerStateService {
  constructor(
    private readonly regionsList: RegionsListService,

    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  // private workers
  // array, which contains all currently
  // running and connected (through Subscription
  // workers)

  // +todo move this somewhere else. Probably into
  // database (or no)
  private workers: RawWorker[] = [];

  // public fetch
  // +todo 
  public async fetch(projectId: string | Types.ObjectId): Promise<RawWorker> {
    return this.workers.find((worker) => worker.projectId == String(projectId));
  };

  // public fetchByToken
  public async fetchByToken(token: string): Promise<RawWorker> {
    return this.workers.find((worker) => worker.token == token);
  };

  // public getState
  public async getState(projectId: string | Types.ObjectId): Promise<EWorkerState> {
    const worker = await this.fetch(projectId);
    
    // Trying to fetch this project's worker
    if (worker) {
      return worker.state;
    } else {
      return EWorkerState.DEAD;
    };
  };

  // public setState
  public async setState(projectId: string | Types.ObjectId, state: EWorkerState) {
    const worker = await this.fetch(projectId);
    if (!worker) return;

    // Updating state
    Object.assign(this.workers.find((x) => x == worker), { ...worker, state });
  
    // Triggering workerStateUpdated
    this.pubSub.publish(WORKERSTATE_SUBSCRIPTION_NAME, { projectId });
  };

  // public getRegion
  public async getRegion(projectId: string | Types.ObjectId): Promise<IRegion | null> {
    const worker = await this.fetch(projectId);
    const region = this.regionsList.regions.find((region) => region.id == worker?.region);

    return region == null ? null : region;
  };

  // public createWorker
  public async createWorker(projectId: string | Types.ObjectId): Promise<EWorkerState> {
    // Firstly we need to check if this project have
    // another worker
    if (await this.getState(projectId) != EWorkerState.DEAD) throw new HttpException(`This project (_id: ${projectId}) already have running worker`, HttpStatus.CONFLICT);

    // Picking first region from RegionsList
    // +todo pick random region
    const region = this.regionsList.regions[0];

    // Creating this worker
    const workerId = this._randomIdentifier(20);
    this.workers.push({
      region: region.id,
      projectId: String(projectId),
      token: this._randomIdentifier(25),
      workerId,
      state: EWorkerState.ASSIGNING,
    });

    console.log('all workers:');
    console.log(this.workers);

    // Trying to ask this region to provision
    this.provisionWorker(projectId);

    // +todo remove
    await (new Promise((resolve) => setTimeout(() => { resolve(null) }, 2500)))

    // Trigger workerStateUpdated
    this.pubSub.publish(WORKERSTATE_SUBSCRIPTION_NAME, { projectId });

    // Returning current worker state
    return EWorkerState.ASSIGNING;
  };

  // private provisionWorker
  private async provisionWorker(projectId: string | Types.ObjectId) {
    const worker = await this.fetch(projectId);
    if (!worker) return;

    const region = await this.getRegion(projectId);
    if (!region || !region.instance) return;

    // Starting container provisioning and monitoring it's progress
    const instance = region.instance;

    // +todo change
    // const container = await instance.createContainer({
    //   Image: "itzg/minecraft-server",
    //   Env: [
    //     "ONLINE_MODE=FALSE",
    //     "TYPE=PAPER",
    //     "EULA=TRUE"
    //   ],
    //   Labels: {
    //     "projectId": String(projectId),
    //     "workerId": worker.workerId,
    //   },
    //   name: `worker-${worker.workerId}`,
    // });

    // Updating state
    await this.setState(projectId, EWorkerState.STARTING);

    // Starting container
    // await container.start();
  };

  // private _randomIdentifier
  // +todo move this to HelperService (probably)
  private _randomIdentifier(length = 12): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };

    return result;
  };
};
