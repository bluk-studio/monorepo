import { gql } from '@apollo/client/core/core.cjs.js';
import type { IExecutionResult } from '@app/shared';

// Exporting ToggleWidgetQuery
export const ToggleWidgetQuery = (widget: string) => {
  return gql`
    mutation Toggle${widget}Widget(
      $dashboardId: String!
      $value: Boolean!
    ) {
      Update${widget}Widget(
        dashboardId: $dashboardId,
        input: {
          enabled: $value
        }
      ) {
        type
      }
    }
  `;
};