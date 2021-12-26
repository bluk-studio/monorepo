import { IProfile } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Project, ProjectObject } from 'src/types';

@ObjectType('Profile')
export class ProfileObject implements IProfile {
  @Field(type => String, { nullable: false })
  _id: Types.ObjectId;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  username?: string;

  // +todo remove
  @Field({ nullable: false })
  token: string;

  @Field(type => [ProjectObject], { nullable: false, defaultValue: [] })
  projects: Project[];
}
