export enum EPermission {
  // Server control
  START = 'START',
  STOP = 'STOP',

  DELETE_PROJECT = 'DELETE_PROJECT',

  // Server Settings
  UPDATE_SERVER_SETTINGS = 'UPDATE_SERVER_SETTINGS',

  // Worker State
  SUBSCRIBE_TO_WORKER_STATE = 'SUBSCRIBE_TO_WORKER_STATE',
};
