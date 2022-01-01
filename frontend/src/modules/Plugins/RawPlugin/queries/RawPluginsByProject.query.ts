// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IRawPlugin } from '@app/shared';

// Exporting IRawPluginsByProjectData interface
export interface IRawPluginsByProjectData {
  RawPluginsByProject: Array<Pick<IRawPlugin, '_id' | 'title' | 'description'>>,
};

// Exporting RawPluginsByProject query (as function)
export const RawPluginsByProject = () => {
  return gql`
    query RawPluginsByProject($projectId: String!) {
      RawPluginsByProject(
        projectId: $projectId,
      ) {
        _id
        title
        description
      }
    }
  `;
};