// Importing modules
import { gql } from '@apollo/client/core/core.cjs.js';
import type { IDashboardConfig } from '@app/shared';

// Exporting IDashboardsByTypeData
export interface IDashboardsByTypeData {
  DashboardsByType: Array<Pick<IDashboardConfig, '_id' | 'name'>>
};

// Exporting DashboardsByType query as function
export const DashboardsByType = () => {
  return gql`
    query DashboardsByType($dashboardType: EDashboardType!) {
      DashboardsByType(type: $dashboardType) {
        _id
        name
      }
    }
  `;
};