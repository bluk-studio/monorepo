import { IServerSettings } from '@app/shared';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateServerSettingsInput implements Partial<IServerSettings> {
  @Field({ nullable: true })
  whitelist: boolean;

  @Field({ nullable: true })
  onlineMode: boolean;

  @Field({ nullable: true })
  address: string;
};