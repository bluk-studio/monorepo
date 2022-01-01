// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';

// Exporting IUpdateRawPluginCodeData
export interface IUpdateRawPluginCodeData {
  UpdateRawPluginCode: {
    __typename: string,
  },
};

// Exporting UpdateRawPluginCode query as function
export const UpdateRawPluginCode = () => {
  return gql`
    mutation UpdateRawPluginCode(
      $pluginId: String!
      
      $changes: [ContentChangeInput!]!
    ) {
      UpdateRawPluginCode(pluginId: $pluginId, changes: $changes) {
        __typename
      }
    }
  `;
};