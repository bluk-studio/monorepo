import { EPermission, IMemberPermission } from '@app/shared';
import { Injectable } from '@nestjs/common';

class PermissionsWrapper {
  private readonly permissions: Array<IMemberPermission>;

  // Constructor
  constructor(
    permissions: Array<IMemberPermission>
  ) {
    this.permissions = permissions;
  };

  // public has
  public has(permission: EPermission): Boolean {
    if (this.permissions.find((x) => x.permission == permission)) {
      return true;
    };

    return false;
  };
};

@Injectable()
export class PermissionsService {
  // public createForPermissions
  public createForPermissions(permissions: Array<IMemberPermission>): PermissionsWrapper {
    return new PermissionsWrapper(permissions);
  };
};