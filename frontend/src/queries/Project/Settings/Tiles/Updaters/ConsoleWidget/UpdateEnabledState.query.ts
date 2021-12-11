import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult } from '@app/shared';

// Exporting IToggleConsoleWidgetMutationResponse interface
interface IToggleConsoleWidgetMutationData {
  UpdateConsoleWidget: {
    widgets: [{
      enabled: boolean,
    }],
  },
};

export type IToggleConsoleWidgetMutationResponse = IExecutionResult<IToggleConsoleWidgetMutationData>;

// Exporting ToggleConsoleWidget
export const ToggleConsoleWidget = gql`
  mutation ToggleConsoleWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdateConsoleWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on ConsoleWidget {
          enabled
        }
      }
    }
  }
`;
