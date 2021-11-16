import { registerEnumType } from '@nestjs/graphql';
import { EPermission } from '@app/shared';

// Registering enum type
registerEnumType(EPermission, {
  name: 'Permission',
});
