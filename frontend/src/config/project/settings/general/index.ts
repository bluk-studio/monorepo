import { getFullday, getOnlineMode, getPublicAddress, getWhitelist, toggleFullday, toggleOnlineMode, toggleWhitelist, updatePublicAddress } from "$stores/project/settings";
import { ESettingCardType, SettingCard } from "../SharedInterfaces.config";

// Exporting GeneralSettings card
export const GeneralSettings: Array<SettingCard> = [
  // Online-mode
  {
    type: 'TOGGLER' as ESettingCardType,

    title: 'Онлайн-режим',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'rss',
    color: '#fbbf24',

    updater: toggleOnlineMode,
    getter: getOnlineMode,
  },

  // Whitelist
  {
    type: ESettingCardType.TOGGLER,

    title: 'Вайтлист',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'shield',
    color: '#3b82f6',

    updater: toggleWhitelist,
    getter: getWhitelist,
  },

  // 24/7 mode
  {
    type: ESettingCardType.TOGGLER,

    title: 'Режим 24/7',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'clock',
    color: '#ec4899',

    updater: toggleFullday,
    getter: getFullday,
  },
  
  // Named Address
  {
    type: ESettingCardType.INPUT,

    title: 'Публичный адресс',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'globe',
    color: '#10b981',

    updater: updatePublicAddress,
    getter: getPublicAddress,
  }
];