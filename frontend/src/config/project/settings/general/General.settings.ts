import { getOnlineMode, getPublicAddress, getWhitelist, toggleOnlineMode, toggleWhitelist, updatePublicAddress } from "$stores/project/settings";
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

  // Named Address
  {
    type: ESettingCardType.INPUT,

    title: 'Публичный адресс',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.',

    icon: 'globe',
    color: '#10b981',

    // Placeholder
    textPlaceholder: 'Публичный адресс',
    placeholder: {
      side: 'right',
      text: '.bluk.studio'
    },

    footerText: 'Принимаются только <span class="bg-gray-300 rounded-full px-1.5 py-0.5">Английские буквы</span> максимум <span class="bg-gray-300 rounded-full px-1.5 py-0.5">20 букв</span>',

    updater: updatePublicAddress,
    getter: getPublicAddress,
  }
];