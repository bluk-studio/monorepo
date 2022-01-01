// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { EResourceType, IEditorSession } from '@app/shared';

// Exporting IEditorSessionData
export interface IEditorSessionSubscriptionData {
  EditorSession: IEditorSession,
};

// Exporting EditorSession subscription as function
export const EditorSessionSubscription = () => {
  return gql`
    subscription CurrentWorkerState(
      $token: String!  
      $resourceType: EResourceType!
      $resourceId: String!
    ) {
      EditorSession(
        token: $token
        resourceType: $resourceType
        resourceId: $resourceId
      ) {
        __typename
        collaborators {
          _id
          email
          username
          offset
        }
        changes {
          id
          change {
            type
            index
            length
            text
          }
        }
        statusBar {
          icon
          text
          finished
        }
      }
    }
  `;
};