import { EWidgetType, IPlayersWidget } from "@app/shared";
import { ObjectType, Field, InputType } from "@nestjs/graphql";

@InputType('PlayersWidgetInput')
@ObjectType('PlayersWidget')
export class PlayersWidgetObject implements IPlayersWidget {
  @Field(type => String, { nullable: false, defaultValue: EWidgetType.PLAYERS })
  type: EWidgetType.PLAYERS;

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