import { IWorkerState, EWorkerState } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from 'src/types';

import { ProjectObject } from '..';
import { WorkerRegionObject } from './region';

@ObjectType('WorkerState')
export class WorkerStateObject implements IWorkerState {
  @Field(type => EWorkerState, { nullable: false, defaultValue: 'DEAD' as EWorkerState })
  state: EWorkerState;
  
  @Field(type => WorkerRegionObject, { nullable: true })
  region?: WorkerRegionObject;

  @Field({ nullable: true })
  address?: string;

  @Field(type => ProjectObject, { nullable: false })
  project: Project;

  // @Field(type => [PluginObject], { nullable: false, defaultValue: [] })
  // plugins: PluginObject[];
};