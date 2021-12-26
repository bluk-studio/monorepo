import { INodeInput } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType('NodeInput')
export class NodeInputObject implements INodeInput {
  @Field(type => String, { nullable: false })
  _id: Types.ObjectId;

  @Field()
  id: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  color?: string;
  
  @Field({ nullable: true })
  description?: string;
  
  @Field({ nullable: true })
  name?: string;
};