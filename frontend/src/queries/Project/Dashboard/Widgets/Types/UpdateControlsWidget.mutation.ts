import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IControlsWidget } from '@app/shared';

// Exporting interface
interface IUpdateControlsWidgetData {
  UpdateControlsWidget: IControlsWidget,
};

export type IUpdateControlsWidgetResponse = IExecutionResult<IUpdateControlsWidgetData>;

// Exporting UpdateControlsWidget
export const UpdateControlsWidget = gql`
  mutation UpdateControlsWidget(
    $dashboardId: String!
    $input: ControlsWidgetInput!
  ) {
    UpdateControlsWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`;
