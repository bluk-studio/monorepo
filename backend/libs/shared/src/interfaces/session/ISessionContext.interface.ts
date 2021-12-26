import { EDashboardType, IProfile } from '@app/shared';

export interface ISessionResource {
  _id: string;
  dashboard?: {
    type: EDashboardType,
    activeId: string
  },
};

// Exporting ISessionContext interface
export interface ISessionContext {
  token: string;
  resources?: ISessionResource[],
  lastAuthorizedUser?: string;
}
