// Exporting array of pages for CreateProject window
export interface CreateProjectPage {
  // Technical properties
  id: string;

  // Visuals
  title: string;
  description: string;
};

export const CreateProjectPages: CreateProjectPage[] = [
  // Plan
  {
    id: 'plan',

    title: 'Создать сервер',
    description: '1. Для того, что бы начать создание сервера, пожалуйста, выберите план.',
  },

  // Information
  {
    id: 'information',

    title: 'Информация о сервере',
    description: '2. Заполните базовую информацию о данном сервере.',
  },

  // Members
  {
    id: 'members',

    title: 'Пригласите друзей',
    description: '3. Хотите разрабатывать этот сервер вместе с друзьями?',
  },

  // Finish stage
  {
    id: 'finish',

    title: 'Итог',
    description: '4. Проверьте правильность и заполненность всех данных.',
  }
];