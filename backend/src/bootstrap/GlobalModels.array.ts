import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema, DashboardConfigSchema, ProjectMemberSchema, ProjectSchema, RawPluginSchema } from 'src/types';

export const GlobalModels = MongooseModule.forFeature([
  // Common models
  {
    name: 'Profile',
    schema: ProfileSchema,
  },

  // Project-related models
  {
    name: 'Project',
    schema: ProjectSchema,
  },
  {
    name: 'ProjectMember',
    schema: ProjectMemberSchema,
  },
  {
    name: 'DashboardConfig',
    schema: DashboardConfigSchema,
  },

  // Plugins
  {
    name: 'RawPlugin',
    schema: RawPluginSchema,
  }
]);
