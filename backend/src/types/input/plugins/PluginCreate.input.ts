import { InputType, Field } from '@nestjs/graphql';

// Exporting PluginCreate input
@InputType()
export class PluginCreateInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
};  