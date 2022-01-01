// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';

// Exporting ISetEditorCursorData
export interface ISetEditorCursorData {
  SetEditorCursor: {
    __typename: string,
  },
};

// Exporting SetEditorCursor mutation as function
export const SetEditorCursor = () => {
  return gql`
    mutation SetEditorCursor(
      $offset: Number!
      
      $resourceType: EResourceType! 
      $resourceId: String!
    ) {
      SetEditorCursor(offset: $offset, resourceType: $resourceType, resourceId: $resourceId) {
        __typename
      }
    }
  `;
};