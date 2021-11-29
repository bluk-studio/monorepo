import { EWidgetType, IDashboardWidget } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('DashboardWidget')
export class DashboardWidgetObject implements IDashboardWidget {
  @Field((type) => EWidgetType, { description: "DashboardWidget's type" })
  type: EWidgetType;

  // Position
  @Field((type) => Number, { description: "X coordinate of DashboardWidget's position" })
  x: number;

  @Field((type) => Number, { description: "Y coordinate of DashboardWidget's position" })
  y: number;

  // Size
  @Field((type) => Number, { description: "DashboardWidget's width" })
  height: number;

  @Field((type) => Number, { description: "DashboardWidget's height" })
  width: number;
};