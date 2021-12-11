import { PlayersWidgetGetters, PlayersWidgetUpdaters } from "$stores/project/settings";
import type { ESettingCardType, SettingCard, TogglerSettingCard } from "..";

// Exporting PlayersWidget setting
export const PlayersWidgetSettings: Array<SettingCard> = [
  // Enable
  <TogglerSettingCard>{
    type: 'TOGGLER' as ESettingCardType,

    title: 'Отображать',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'check',
    color: '#10b981',

    size: '1/2',

    getter: PlayersWidgetGetters.isEnabled,
    updater: PlayersWidgetUpdaters.enable,
  }
];