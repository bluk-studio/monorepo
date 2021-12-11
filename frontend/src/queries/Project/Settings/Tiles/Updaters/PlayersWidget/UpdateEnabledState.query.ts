import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IProject } from '@app/shared';

// Exporting ITogglePlayersWidgetMutationResponse interface
interface ITogglePlayersWidgetMutationData {
  UpdatePlayersWidget: {
    widgets: [{
      enabled: boolean,
    }],
  },
};

export type ITogglePlayersWidgetMutationResponse = IExecutionResult<ITogglePlayersWidgetMutationData>;

// Exporting TogglePlayersWidget
export const TogglePlayersWidget = gql`
  mutation TogglePlayersWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdatePlayersWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on PlayersWidget {
          enabled
        }
      }
    }
  }
`;
