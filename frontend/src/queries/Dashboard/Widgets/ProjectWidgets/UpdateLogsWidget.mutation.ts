import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, ILogsWidget } from '@app/shared';

// Exporting interface
interface IUpdateLogsWidgetData {
  UpdateLogsWidget: ILogsWidget,
};

export type IUpdateLogsWidgetResponse = IExecutionResult<IUpdateLogsWidgetData>;

// Exporting UpdateLogsWidget
export const UpdateLogsWidget = gql`
  mutation UpdateLogsWidget(
    $dashboardId: String!
    $input: LogsWidgetInput!
  ) {
    UpdateLogsWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      type
    }
  }
`;
