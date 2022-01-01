// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { EDashboardType, IDashboardConfig } from '@app/shared';
import { AllCodeEditorWidgets, AllProjectWidgets } from '.';

// Exporting ICurrentDashboardData interface
export interface ICurrentDashboardData {
  CurrentDashboard: Pick<IDashboardConfig, '_id' | 'type' | 'name' | 'widgets'>
};

// Exporting CurrentDashboard query as function
export const CurrentDashboard = (type: EDashboardType) => {
  // Determining which widgets we need to query
  const widgets = [];
  console.log(type);
  switch (type) {
    // AllCodeEditorWidgets
    case 'CODE_EDITOR':
      console.log('code editor widgtes');
      widgets.push(AllCodeEditorWidgets);
      break;

    // AllProjectWidgets
    case 'PROJECT':
      widgets.push(AllProjectWidgets);
      break;
  };
  
  return gql`
    query CurrentDashboard(
      $resourceId: String!
    ) {
      CurrentDashboard(dashboardType: ${type}, resourceId: $resourceId) {
        _id
        type
        name
        widgets {
          __typename
          ${widgets.join('')}
        }
      }
    }
  `;
};