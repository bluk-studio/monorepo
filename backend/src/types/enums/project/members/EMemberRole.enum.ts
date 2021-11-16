import { EMemberRole } from '@app/shared';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(EMemberRole, { name: 'MemberRole' });
