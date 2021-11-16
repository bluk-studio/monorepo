import * as AuthServices from 'src/modules/Auth/services';
import * as ProfileServices from 'src/modules/Profile/services';
import * as ProjectServices from 'src/modules/Project/services';

export const GlobalServices = [
  ...Object.values(AuthServices),
  ...Object.values(ProfileServices),
  ...Object.values(ProjectServices),
];
