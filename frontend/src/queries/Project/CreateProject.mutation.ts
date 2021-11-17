import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting ICreateProjectMutationResponse interface
interface ICreateProjectMutationData {
  CreateProject: IProject,
};

export type ICreateProjectMutationResponse = IExecutionResult<ICreateProjectMutationData>;

// Exporting CreateProject
export const CreateProject = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    CreateProject(input: $input) {
      _id
    }
  }
`;
