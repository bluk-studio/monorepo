import { ObjectType, Field } from '@nestjs/graphql';
import { ServerSettingsObject } from './settings';

@ObjectType('ProjectSettings')
export class ProjectSettingsObject {
  @Field(type => ServerSettingsObject, { nullable: false })
  server: ServerSettingsObject
};