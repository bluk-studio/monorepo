import { IProjectDashboardConfig } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ProfileObject, ProjectObject } from 'src/types';
import { DashboardWidgetObject } from '.';

@ObjectType('ProjectDashboardConfig')
export class ProjectDashboardConfigObject implements Omit<IProjectDashboardConfig, 'pid' | 'uid'> {
  @Field((type) => String, { nullable: false, description: "System ID of ProjectDashboardConfig instance" })
  _id: Types.ObjectId;

  @Field((type) => String, { nullable: false, description: "Display name of ProjectDashboardConfig" })
  name: string;

  @Field((type) => ProjectObject, { nullable: false, description: "Project instance of this ProjectDashboardConfig" })
  project: ProjectObject;

  @Field((type) => ProfileObject, { nullable: false, description: "Project instance, that's assosiated with this ProjectDashboardConfig" })
  profile: ProfileObject;

  @Field((type) => [DashboardWidgetObject], { description: "Array of DashboardWidget's assosiated with this ProjectDashboardConfig" })
  widgets: [DashboardWidgetObject];
};