import { forwardRef, Module } from '@nestjs/common';
import { RawPluginModule } from '../../Types';
import { AuthModule } from 'src/modules/Auth/module';
import { ProjectModule } from 'src/modules/Project/module';
import { EditorModule } from 'src/modules/Editor/module';
import { PubSub } from 'graphql-subscriptions';

import * as Services from './services';
import * as Resolvers from './resolvers';

const Subscription = {
  provide: 'PLUGIN_PUB_SUB',
  useValue: new PubSub(),
};

@Module({
  imports: [forwardRef(() => RawPluginModule), ProjectModule, AuthModule, EditorModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers), Subscription],
  exports: [...Object.values(Services), Subscription],
})
export class CodeUpdaterModule {}