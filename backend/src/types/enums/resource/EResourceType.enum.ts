import { EResourceType } from "@app/shared";
import { registerEnumType } from "@nestjs/graphql";

registerEnumType(EResourceType, { name: 'EResourceType' })