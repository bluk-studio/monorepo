import { registerEnumType } from '@nestjs/graphql';
import { EPluginType } from '@app/shared';

registerEnumType(EPluginType, {
  name: 'EPluginType',
  description: "Plugin type"
});