import { InputType, Field } from '@nestjs/graphql';
import { DashboardWidgetInput } from 'src/types';

@InputType()
export class UpdateDashboardConfigInput {
  @Field((type) => String, { nullable: true })
  name?: string;

  // +todo
  @Field((type) => [DashboardWidgetInput], { nullable: true })
  widgets?: DashboardWidgetInput[]
};