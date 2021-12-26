import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/guards';
import { Profile, ProjectSettingsObject, ServerSettingsObject, UpdateServerSettingsInput } from 'src/types';
import { ServerSettingsService } from '../../services/Settings';
import { PubSub } from 'graphql-subscriptions';
import { WORKERSTATE_SUBSCRIPTION_NAME } from '@app/shared';


@Resolver(of => ServerSettingsObject)
export class ServerSettingsResolver {
  constructor(
    private readonly service: ServerSettingsService,

    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  // mutation updateServerSettings
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectSettingsObject, { name: 'UpdateServerSettings' })
  public async updateServerSettings(
    @Args('projectId') projectId: string,
    @Args('input') input: UpdateServerSettingsInput,
    @Context('user') profile: Profile,
  ) {
    // Update Server Settings
    const response = await this.service.update(projectId, input, profile);
    
    // Trigger workerStateUpdated
    this.pubSub.publish(WORKERSTATE_SUBSCRIPTION_NAME, { projectId });
    
    return response;
  };
};