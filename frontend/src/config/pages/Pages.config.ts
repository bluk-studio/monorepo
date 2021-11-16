// Importing information about all site's pages

// Exporting IPage interface
// +todo
export interface IPage {
  // Technical
  url: string | string[];
  // +todo
  checkName: string;

  // Visual
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
};

export const Pages: Array<IPage> = [
  // Project Selector
  {
    url: '/app/selector',
    icon: 'list',
    iconColor: '#818cf8',

    checkName: 'projectSelector',
    title: 'Выбрать сервер',
    description: 'Перейти к списку существующих серверов'
  },

  // Create Project
  {
    url: [
      '/app/create',
      '/app/create/plan',
      '/app/create/information',
      '/app/create/members',
      '/app/create/finish',
    ],
    icon: 'layers',

    checkName: 'createProject',
    title: 'Создать сервер',
    description: 'Создать новый сервер'
  }
];
