import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDashboardConfigInput {
  @Field((type) => String)
  name: string;
};