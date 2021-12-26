import { IPlugin, IProfile } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProfileObject } from '..';
import { PluginNodeObject } from './nodes';

@ObjectType('Plugin')
export class PluginObject implements IPlugin {
  // Visual
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  // Technical
  @Field({ nullable: false, defaultValue: false })
  public: boolean;

  @Field(type => ProfileObject, { nullable: false })
  creator: ProfileObject;

  @Field(type => [PluginNodeObject], { nullable: false, defaultValue: [] })
  nodes: PluginNodeObject[];
};