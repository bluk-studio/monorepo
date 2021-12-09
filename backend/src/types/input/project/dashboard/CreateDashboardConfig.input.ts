import { InputType, Field } from '@nestjs/graphql';
import { ConsoleWidgetObject, PlayersWidgetObject } from 'src/types';

@InputType()
export class CreateDashboardConfigInput {
  @Field((type) => String)
  name: string;
};