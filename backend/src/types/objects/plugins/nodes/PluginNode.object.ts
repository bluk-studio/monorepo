import { IPluginNode } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { NodeCodeObject, NodeInputObject, NodeOutputObject } from '.';

@ObjectType('PluginNode')
export class PluginNodeObject implements IPluginNode {
  @Field(type => NodeCodeObject, { nullable: false })
  code: NodeCodeObject;

  @Field(type => [NodeInputObject], { nullable: false, defaultValue: [] })
  inputs: NodeInputObject[];

  @Field(type => [NodeOutputObject], { nullable: false, defaultValue: [] })
  outputs: NodeOutputObject[];
};