import { EWorkerState } from "@app/shared";
import { registerEnumType } from "@nestjs/graphql";

registerEnumType(EWorkerState, {
  name: 'ProjectWorkerState',
})