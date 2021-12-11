import { EWidgetType, IControlsWidget } from "@app/shared";
import { ObjectType, Field, InputType } from "@nestjs/graphql";

@ObjectType('ControlsWidget')
export class ControlsWidgetObject implements IControlsWidget {
  @Field(type => String, { nullable: false, defaultValue: EWidgetType.CONTROLS })
  type: EWidgetType.CONTROLS;

  @Field(type => Boolean, { nullable: false, defaultValue: false })
  enabled: boolean;

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

  // Other fields
};