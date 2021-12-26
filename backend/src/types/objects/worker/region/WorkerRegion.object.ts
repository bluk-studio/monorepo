import { IWorkerRegion } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('WorkerRegion')
export class WorkerRegionObject implements IWorkerRegion {
  @Field({ nullable: false })
  id: string;

  @Field()
  name: string;

  @Field()
  location: string;
};