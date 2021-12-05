// Exporting SettingsCategory interface
export interface SettingsCategory {
  // Id of category.
  // Also equals to {page} in this scheme: /app/{projectId}/settings/{page}
  id: string;
  
  // Visual
  title: string;
  icon: string;
};

// Exporting array of SettingsCategory objects
export const SettingsCategories: Array<SettingsCategory> = [
  // General
  {
    id: 'general',

    title: 'Базовое',
    icon: 'globe',
  },

  // Tiles
  {
    id: 'tiles',

    title: 'Тайлы',
    icon: 'grid',
  },
];