// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';

// Exporting IPingEditorSessionData
export interface IPingEditorSessionData {
  PingEditorSession: {
    __typename: string,
  },
};

// Exporting PingEditorSession mutation as function
export const PingEditorSession = () => {
  return gql`
    mutation PingEditorSession(
      $resourceType: EResourceType!
      $resourceId: String!
    ) {
      PingEditorSession(resourceType: $resourceType, resourceId: $resourceId) {
        __typename
      }
    }
  `;  
};