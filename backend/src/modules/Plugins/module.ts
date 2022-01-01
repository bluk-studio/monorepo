import { Module } from '@nestjs/common';
import { GlobalModels, GlobalServices } from 'src/bootstrap';

// Importing different sub-modules
import { BasicPluginModule } from './Basic/module';

// Code Updaters
import * as Updaters from './Updaters';

// Plugin types
import * as PluginTypes from './Types';

@Module({
  imports: [BasicPluginModule, ...Object.values(PluginTypes), ...Object.values(Updaters)],
})
export class PluginsModule {};