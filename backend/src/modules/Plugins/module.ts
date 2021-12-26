import { Module } from '@nestjs/common';
import { GlobalModels, GlobalServices } from 'src/bootstrap';

// Importing different sub-modules
import { RawPluginModule } from './RawPlugin/module';
// import { VisualPluginModule } from './VisualPlugin/module';
// import { NodeModule } from './Node/module';

@Module({
  imports: [RawPluginModule],
})
export class PluginsModule {};