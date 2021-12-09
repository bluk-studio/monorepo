import { EWidgetType, IConsoleWidget } from "@app/shared";
import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType('ConsoleWidgetInput')
@ObjectType('ConsoleWidget')
export class ConsoleWidgetObject implements IConsoleWidget {
  @Field(type => String, { nullable: false, defaultValue: EWidgetType.CONSOLE })
  type: EWidgetType.CONSOLE;

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