import { ITunnel } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectObject } from '..';

@ObjectType('Tunnel')
export class TunnelObject implements ITunnel {
  projectId: string;
  
  @Field(type => ProjectObject)
  project: ProjectObject

  @Field({ nullable: false })
  port: number;
};