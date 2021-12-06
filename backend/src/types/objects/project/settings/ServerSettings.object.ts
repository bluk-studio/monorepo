import { IServerSettings } from "@app/shared";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('ServerSettings')
export class ServerSettingsObject implements IServerSettings {
  @Field({ nullable: false })
  onlineMode: boolean;

  @Field({ nullable: false })
  whitelist: boolean;
};