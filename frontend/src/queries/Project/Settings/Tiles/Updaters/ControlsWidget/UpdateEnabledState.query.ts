import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult } from '@app/shared';

// Exporting IToggleControlsWidgetMutationResponse interface
interface IToggleControlsWidgetMutationData {
  UpdateControlsWidget: {
    widgets: [{
      enabled: boolean,
    }],
  },
};

export type IToggleControlsWidgetMutationResponse = IExecutionResult<IToggleControlsWidgetMutationData>;

// Exporting ToggleControlsWidget
export const ToggleControlsWidget = gql`
  mutation ToggleControlsWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdateControlsWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on ControlsWidget {
          enabled
        }
      }
    }
  }
`;
