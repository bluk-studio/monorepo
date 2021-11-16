import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description?: string;
}
