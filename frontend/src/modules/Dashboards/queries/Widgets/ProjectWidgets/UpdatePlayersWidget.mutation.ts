import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult, IPlayersWidget } from '@app/shared';

// Exporting interface
interface IUpdatePlayersWidgetData {
  UpdatePlayersWidget: IPlayersWidget,
};

export type IUpdatePlayersWidgetResponse = IExecutionResult<IUpdatePlayersWidgetData>;

// Exporting UpdatePlayersWidget
export const UpdatePlayersWidget = gql`
  mutation UpdatePlayersWidget(
    $dashboardId: String!
    $input: PlayersWidgetInput!
  ) {
    UpdatePlayersWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      type
    }
  }
`;
