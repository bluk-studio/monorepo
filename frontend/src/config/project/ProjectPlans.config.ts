export interface ProjectPlan {
  // Technical
  // +todo EProjectPlanType from @app/shared
  id: string,
  price: number,

  // Visuals
  icon: string,
  color: string,

  title: string,
  description: string,
};

// Exporting ProjectPlans config
export const ProjectPlans: ProjectPlan[] = [
  // Developer plan
  {
    id: 'developer',
    price: 0,

    icon: 'code',
    color: '#fbbf24',

    title: 'План разработчика',
    description: "Неограниченный план, в котором сервера работают <span class='border-b-2 border-yellow-400'>24/7</span>, <span class='border-b-2 border-yellow-400'>безлимитное кол-во плагинов</span>, <span class='border-b-2 border-yellow-400'>игроков</span> и многое-многое другое.",
  },
];