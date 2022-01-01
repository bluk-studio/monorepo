// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { IProject, IRawPlugin } from '@app/shared';

// Exporting IRawPluginByIdData interface
export interface IRawPluginByIdData {
  RawPluginById: Pick<IRawPlugin, '_id' | 'title' | 'description' | 'code'> & { project?: Pick<IProject, '_id'> },
};

// Exporting RawPluginById query (as function)
export const RawPluginById = () => {
  return gql`
    query RawPluginById($pluginId: String!) {
      RawPluginById(
        pluginId: $pluginId
      ) {
        _id
        title
        description
        code
        project {
          _id
        }
      }
    }
  `;
};