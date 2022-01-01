import { IEditorStatusBar, UPDATE_RAWPLUGIN_SUBSCRIPTION } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Types } from 'mongoose';

@Injectable()
export class ExploreCodeService {
  constructor(
    @Inject('PLUGIN_PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  // public explore
  public async explore(pluginId: string | Types.ObjectId, code: string) {
    console.log('explore');
    
    // Exploring code...
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 2000);
    });
    
    console.log('1');
    this.pubSub.publish(UPDATE_RAWPLUGIN_SUBSCRIPTION, <IEditorStatusBar>{ pluginId, text: "тестовый текст (1/2)" })

    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 2000);
    });

    console.log('2');
    this.pubSub.publish(UPDATE_RAWPLUGIN_SUBSCRIPTION, <IEditorStatusBar>{ pluginId, text: "Текст с иконкой (2/2)", icon: 'globe' });

    // Finishing
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 2000);
    });

    console.log('3');
    console.log('last updated code:');
    console.log(code);
    this.pubSub.publish(UPDATE_RAWPLUGIN_SUBSCRIPTION, <IEditorStatusBar>{ pluginId, text: "2 сообщения", icon: 'alert-triangle', code, finished: true });
  };
};