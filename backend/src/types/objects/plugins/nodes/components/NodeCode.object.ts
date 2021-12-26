import { INodeCode } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('NodeCode')
export class NodeCodeObject implements INodeCode {
  @Field()
  raw: string;
};