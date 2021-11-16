import { IProfile } from '@app/shared';

// Exporting ISessionContext interface
export interface ISessionContext {
  token: string;
  lastAuthorizedUser?: string;
}
