import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult } from '@app/shared';

// Exporting IToggleLogsWidgetMutationResponse interface
interface IToggleLogsWidgetMutationData {
  UpdateLogsWidget: {
    widgets: [{
      enabled: boolean,
    }],
  },
};

export type IToggleLogsWidgetMutationResponse = IExecutionResult<IToggleLogsWidgetMutationData>;

// Exporting ToggleLogsWidget
export const ToggleLogsWidget = gql`
  mutation ToggleLogsWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdateLogsWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on LogsWidget {
          enabled
        }
      }
    }
  }
`;
