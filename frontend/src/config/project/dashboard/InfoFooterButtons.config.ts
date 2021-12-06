// Exporting InfoFooterButton interface
export interface InfoFooterButton {
  url?: string,
  click?: () => void,
  
  // Visuals
  title: string;
  icon: string;

  isGhost: boolean;
};

// Exporting buttons array
export const InfoFooterButtons: Array<InfoFooterButton> = [
  // Editor
  {
    url: 'editor',

    title: 'Редактор',
    icon: 'code',

    isGhost: false,
  },

  // Settings
  {
    url: 'settings',
    
    title: 'Настройки',
    icon: 'settings',

    isGhost: true,
  },

  // More
  {
    click: () => {
      document.dispatchEvent(new Event('openPageExplorer'));
    },

    title: 'Больше',
    icon: 'external-link',

    isGhost: true,
  },
];