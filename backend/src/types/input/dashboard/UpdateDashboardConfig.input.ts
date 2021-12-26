import { InputType, Field } from '@nestjs/graphql';
import { MovableDashboardWidgetInput } from 'src/types';

@InputType()
export class UpdateDashboardConfigInput {
  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => [MovableDashboardWidgetInput], { nullable: true })
  widgets: MovableDashboardWidgetInput[]
};