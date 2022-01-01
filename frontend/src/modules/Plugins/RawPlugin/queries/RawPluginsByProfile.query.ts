// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IRawPlugin } from '@app/shared';

// Exporting IRawPluginsByProfileData interface
export interface IRawPluginsByProfileData {
  RawPluginsByProfile: Array<Pick<IRawPlugin, '_id' | 'title' | 'description'>>,
};

// Exporting RawPluginsByProfile query (as function)
export const RawPluginsByProfile = (
  // Variables
  includeOtherProjectsPlugins = false,
) => {
  return gql`
    query RawPluginsByProfile {
      RawPluginsByProfile(
        includeProjectPlugins: ${includeOtherProjectsPlugins}
      ) {
        _id
        title
        description
      }
    }
  `;
};