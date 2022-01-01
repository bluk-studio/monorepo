import { IRawPlugin } from '@app/shared';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
// +todo updatable marketplace information
export class UpdateRawPluginInput implements Omit<IRawPlugin, '__typename' | '_id' | 'projectId' | 'creatorId' | 'marketplace'> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  code: string[];
};