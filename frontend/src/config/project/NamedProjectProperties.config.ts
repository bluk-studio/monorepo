export interface NamedProjectProperty {
  // Technical
  id: string;
  pageId?: string;

  // - is this property required to create project?
  required: boolean;
  
  // Visuals
  icon?: string;
  title: string;
  description: string;
};

// Exporting project properties (with names and descriptions)
export const NamedProjectProperties: NamedProjectProperty[] = [
  // Plan
  {
    id: 'plan',
    pageId: 'plan',
    required: true,

    icon: 'box',
    title: 'План',
    description: 'План, который определяет сколько ресурсов и за какие деньги вы получаете.',
  },

  // Name
  {
    id: 'name',
    pageId: 'information',
    required: true,

    icon: 'feather',
    title: 'Название',
    description: 'Уникальное название вашего сервера.',
  },

  // Description
  {
    id: 'description',
    pageId: 'information',
    required: false,

    icon: 'align-center',
    title: 'Описание',
    description: 'Необязательное описание сервера.',
  },

  // Members
  // {
  //   id: 'members',
  //   pageId: 'members',
  //   required: false,

  //   icon: 'user',
  //   title: 'Другие участники',
  //   description: 'Ваши друзья, которых вы пригласили и которые получают доступ к серверу.',
  // }
];