import { INodeOutput } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType('NodeOutput')
export class NodeOutputObject implements INodeOutput {
  @Field(type => String, { nullable: false })
  _id: Types.ObjectId;
  
  @Field()
  type: string;
  
  @Field({ nullable: true })
  color?: string;
  
  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  name?: string;
};