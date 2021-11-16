import { EMemberRole, IProjectMember } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { MemberPermissionsObject, Profile, ProfileObject } from 'src/types';
import { Types } from 'mongoose';

@ObjectType('ProjectMember')
export class ProjectMemberObject implements Partial<IProjectMember> {
  @Field((type) => String, {
    nullable: false,
    description: 'Unique ProjectMember instance id',
  })
  _id: Types.ObjectId;

  @Field((type) => ProfileObject, {
    description:
      "Profile, to whom this ProjectMember's instance role and permissions applies",
  })
  profile: Profile;

  @Field((type) => EMemberRole, {
    nullable: false,
    description: "Member's role",
  })
  role: EMemberRole;

  @Field((type) => MemberPermissionsObject, {
    nullable: true,
    description: 'Optional permissions set for this user. An object.',
  })
  permissions?: MemberPermissionsObject;
}
