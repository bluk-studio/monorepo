import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting ProfileProjectsResponse type
export interface IProfileProjectsData {
  ProfileProjects: IProject[]
};

export type IProfileProjectsResponse = IExecutionResult<IProfileProjectsData>;

// Exporting query itself
export const ProfileProjects = gql`
  query ProfileProjects {
    ProfileProjects {
      _id
      name
      description
    }
  }
`;
