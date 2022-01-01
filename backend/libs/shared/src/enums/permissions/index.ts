export enum EPermission {
  // Server control
  START = 'START',
  STOP = 'STOP',

  DELETE_PROJECT = 'DELETE_PROJECT',

  // Server Settings
  UPDATE_SERVER_SETTINGS = 'UPDATE_SERVER_SETTINGS',

  // Worker State
  SUBSCRIBE_TO_WORKER_STATE = 'SUBSCRIBE_TO_WORKER_STATE',

  // Editor
  SUBSCRIBE_TO_EDITOR_SESSION = 'SUBSCRIBE_TO_EDITOR_SESSION',

  // Plugins
  ADD_PLUGIN_TO_PROJECT = 'ADD_PLUGIN_TO_PROJECT',

  // - RawPlugins
  FETCH_RAW_PLUGINS = 'FETCH_RAW_PLUGINS',
  UPDATE_RAW_PLUGINS = 'UPDATE_RAW_PLUGINS',
  UPDATE_RAW_PLUGIN_CODE = 'UPDATE_RAW_PLUGIN_CODE',
};
