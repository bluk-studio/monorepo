import { EDashboardType, IDashboardConfig } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ProfileObject, ProjectObject } from 'src/types';
import { DashboardWidgetUnion } from 'src/types/unions';

@ObjectType('DashboardConfig')
export class DashboardConfigObject implements Omit<IDashboardConfig, 'rid' | 'uid'> {
  @Field((type) => String, { nullable: false, description: "System ID of ProjectDashboardConfig instance" })
  _id: Types.ObjectId;

  @Field((type) => EDashboardType, { nullable: false, description: "Type of this DashboardConfig (either PROJECT, CODE_EDITOR or VISUAL_EDITOR or else...)" })
  type: EDashboardType;

  @Field((type) => String, { nullable: false, description: "Display name of DashboardConfig" })
  name: string;

  @Field((type) => ProjectObject, { nullable: false, description: "Project instance of this DashboardConfig (type: PROJECT)" })
  project?: ProjectObject;

  @Field((type) => ProfileObject, { nullable: false, description: "Profile instance, that's assosiated with this DashboardConfig" })
  profile: ProfileObject;

  @Field((type) => [DashboardWidgetUnion], { description: "Array of DashboardWidget's assosiated with this DashboardConfig" })
  widgets: [typeof DashboardWidgetUnion];
};