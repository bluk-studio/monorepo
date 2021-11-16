import {
  IMemberPermission,
  IMemberPermissions,
  EPermission,
} from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectMember, ProjectMemberObject } from 'src/types';
import { Types } from 'mongoose';

@ObjectType('MemberPermission')
export class MemberPermission implements IMemberPermission {
  issuerId?: Types.ObjectId;

  @Field((type) => ProjectMemberObject, {
    description: 'ProjectMember instance of a person who added this permission',
  })
  issuer: ProjectMember;

  @Field((type) => EPermission, { description: 'Permission enumerable' })
  permission: EPermission;
}

@ObjectType('MemberPermissions')
export class MemberPermissionsObject implements IMemberPermissions {
  @Field({
    nullable: true,
    description: 'Unix date when last changes were made',
  })
  lastModified?: number;

  @Field((type) => [MemberPermission], {
    nullable: true,
    description: 'Set of MemberPermission objects',
  })
  list?: Array<MemberPermission>;
}
