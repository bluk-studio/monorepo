import { InputType, Field } from '@nestjs/graphql';
import { DashboardWidgetInput } from 'src/types';

@InputType()
export class CreateDashboardConfigInput {
  @Field((type) => String)
  name: string;

  // +todo
  @Field((type) => [DashboardWidgetInput], { nullable: true })
  widgets?: DashboardWidgetInput[]
};