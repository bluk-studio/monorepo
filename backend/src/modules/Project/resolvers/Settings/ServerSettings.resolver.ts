import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UserAuthGuard } from 'src/guards';
import { Profile, ProjectSettingsObject, ServerSettingsObject, UpdateServerSettingsInput } from 'src/types';
import { ServerSettingsService } from '../../services/Settings';

@Resolver(of => ServerSettingsObject)
export class ServerSettingsResolver {
  constructor(
    private readonly service: ServerSettingsService,
  ) {}

  // mutation updateServerSettings
  @UseGuards(UserAuthGuard)
  @Mutation(returns => ProjectSettingsObject, { name: 'UpdateServerSettings' })
  public async updateServerSettings(
    @Args('projectId') projectId: string,
    @Args('input') input: UpdateServerSettingsInput,
    @Context('user') profile: Profile,
  ) {
    return await this.service.update(projectId, input, profile);
  };
};