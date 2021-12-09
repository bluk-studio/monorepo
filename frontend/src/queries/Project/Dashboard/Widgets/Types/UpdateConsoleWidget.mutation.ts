import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IConsoleWidget } from '@app/shared';

// Exporting interface
interface IUpdateConsoleWidgetData {
  UpdateConsoleWidget: IConsoleWidget,
};

export type IUpdateConsoleWidgetResponse = IExecutionResult<IUpdateConsoleWidgetData>;

// Exporting UpdateConsoleWidget
export const UpdateConsoleWidget = gql`
  mutation UpdateConsoleWidget(
    $dashboardId: String!
    $input: ConsoleWidgetInput!
  ) {
    UpdateConsoleWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`;
