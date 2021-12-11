import { ControlsWidgetGetters, ControlsWidgetUpdaters } from "$stores/project/settings";
import type { ESettingCardType, SettingCard, TogglerSettingCard } from "..";

// Exporting ControlsWidget setting
export const ControlsWidgetSettings: Array<SettingCard> = [
  // Enable
  <TogglerSettingCard>{
    type: 'TOGGLER' as ESettingCardType,

    title: 'Отображать',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'check',
    color: '#10b981',

    size: '1/2',

    getter: ControlsWidgetGetters.isEnabled,
    updater: ControlsWidgetUpdaters.enable,
  }
];