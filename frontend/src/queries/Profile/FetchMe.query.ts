import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProfile } from '@app/shared';

// Exporting FetchMeResponse type
export interface IFetchMeData {
  me: IProfile
};

export type IFetchMeResponse = IExecutionResult<IFetchMeData>;

// +todo remove token from this request
// Exporting query itself
export const FetchMe = gql`
  query me {
    me {
      _id
      email
      token
    }
  }
`;
