import { IProject } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectMember, ProjectMemberObject } from 'src/types';
import { Types } from 'mongoose';

@ObjectType('Project')
export class ProjectObject implements IProject {
  @Field((type) => String, {
    nullable: false,
    description: "Unique project's id",
  })
  _id: Types.ObjectId;

  @Field({ nullable: false, description: 'Non-unique project name' })
  name: string;

  @Field({ nullable: true, description: 'Optional project description' })
  description: string;

  @Field((type) => [ProjectMemberObject], {
    nullable: false,
    description: "Project's members array",
  })
  members: Array<ProjectMember>;
}
