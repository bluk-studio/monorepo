import { EWidgetType } from '@app/shared';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MovableDashboardWidgetInput {
  @Field(type => EWidgetType, { nullable: false })
  type: EWidgetType;

  @Field({ nullable: false })
  x: number;

  @Field({ nullable: false })
  y: number;
  
  @Field({ nullable: false })
  width: number;
  
  @Field({ nullable: false })
  height: number;
};