// Importing information about all site's pages

// Exporting IPage interface
// +todo
export interface IPage {
  // Technical
  url: string;
  regex: RegExp;
  // +todo
  checkName: string;
  category: string;

  // Visual
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
};

export interface ICategory {
  id: string;
  
  title: string;
  description?: string;
}

export const Categories: Array<ICategory> = [
  // Basic category
  {
    id: 'basic',
    
    title: 'Базовое',
    description: 'Банальные и обычные страницы'
  },

  // Project
  {
    id: 'project',

    title: 'Проект',
    description: 'Все страницы, связанные с текущим проектом',
  },

  // Marketplace
  {
    id: 'marketplace',

    title: 'Маркетплейс',
    description: 'Все аддоны, ноды и подобное'
  },
]

export const Pages: Array<IPage> = [
  // Project Selector
  {
    url: '/app/selector',
    regex: /\/app\/selector/,
    checkName: 'projectSelector',
    category: 'basic',

    icon: 'list',
    iconColor: '#818cf8',

    title: 'Выбрать сервер',
    description: 'Перейти к списку существующих серверов'
  },

  // Create Project
  {
    url: '/app/create',
    regex: /\/app\/create\/[\s\S]+/,
    checkName: 'createProject',
    category: 'basic',

    icon: 'layers',
    title: 'Создать сервер',
    description: 'Создайте новый бесплатный сервер'
  },

  // Editor
  {
    url: '/app/editor',
    regex: /\/app\/editor/,
    checkName: 'alwaysShow',
    category: 'basic',

    icon: 'code',
    title: 'Редактор',
    description: 'Главное место создания и модернизации всего контента',
  },


  // 
  // Marketplace related
  // 

  // Explore page

  {
    url: '/app/marketplace',
    regex: /\/app\/marketplace\/(explore)/,
    checkName: 'alwaysShow',
    category: 'marketplace',

    icon: 'shopping-bag',
    title: 'Маркетплейс',
    description: 'Самое популярное из маркетплейса',
  },

  // 
  // Current Project related
  // 

  // Dashboard
  {
    url: '/app/${ $page.params.projectId }/dashboard',
    regex: /\/app\/[\s\S]{24}\/dashboard/,
    checkName: 'currentProject',
    category: 'project',

    icon: 'home',
    iconColor: '#34d399',

    title: 'Главная',
    description: 'Вся самая важная информация о текущем сервере'
  },

  // Editor
  {
    url: '/app/${ $page.params.projectId }/editor',
    regex: /\/app\/[\s\S]{24}\/editor\/[\s\S]+/,
    checkName: 'currentProject',
    category: 'project',

    icon: 'code',
    iconColor: '#f472b6',

    title: 'Редактор',
    description: 'Создавайте и редактируйте свои плагины'
  },

  // Worlds
  {
    url: '/app/${ $page.params.projectId }/worlds',
    regex: /\/app\/[\s\S]{24}\/worlds/,
    checkName: 'currentProject',
    category: 'project',

    icon: 'archive',
    // iconColor: '#f472b6',

    title: 'Миры',
    description: 'Настройки всех доступных на сервере миров'
  },

  // Settings
  {
    url: '/app/${ $page.params.projectId }/settings',
    regex: /\/app\/[\s\S]{24}\/settings\/[\s\S]+/,
    checkName: 'currentProject',
    category: 'project',

    icon: 'settings',
    // iconColor: '#f472b6',

    title: 'Настройки',
    description: 'Глобальные настройки всего сервера и проекта'
  },
];
