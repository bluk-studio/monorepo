import { EWidgetType, IDashboardWidget } from '@app/shared';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DashboardWidgetInput implements Partial<IDashboardWidget> {
  @Field(type => EWidgetType, { description: "DashboardWidget's type" })
  type: EWidgetType;

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  x: number;

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  y: number;

  @Field(type => Number, { nullable: true, defaultValue: 2 })
  width: number;
  
  @Field(type => Number, { nullable: true, defaultValue: 2 })
  height: number;
};