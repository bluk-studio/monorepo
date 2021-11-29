import { IProfile } from '@app/shared';

export interface ISessionProject {
  _id: string;
  activeDashboardId?: string
};

// Exporting ISessionContext interface
export interface ISessionContext {
  token: string;
  projects?: ISessionProject[],
  lastAuthorizedUser?: string;
}
