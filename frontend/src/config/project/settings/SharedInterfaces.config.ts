// Exporting ESettingCardType enum
export enum ESettingCardType {
  TOGGLER = 'TOGGLER',
  INPUT = 'INPUT',
};

// Exporting SettingUpdaterInput interface
export type SettingUpdaterInput = TogglerUpdaterPayload | InputUpdaterPayload;

export interface TogglerUpdaterPayload {
  type: ESettingCardType.TOGGLER,
  enabled: boolean,
};

export interface InputUpdaterPayload {
  type: ESettingCardType.INPUT,
  value: string,
};

// Exporting SettingCard interfaces
export type SettingCard = TogglerSettingCard | InputSettingCard;

export interface BasicSettingCard {
  type: ESettingCardType,

  // Visual
  title: string,
  description: string,

  size?: string,

  icon: string,
  color: string,

  documentationLink?: string,

  // Technical
  updater: (input: SettingUpdaterInput) => Promise<boolean | string>,
  getter: () => Promise<boolean | string>,
};

export interface TogglerSettingCard extends BasicSettingCard {};

export interface InputSettingCard extends BasicSettingCard {
  // Placeholders configuration
  textPlaceholder?: string,
  placeholder?: {
    side: 'left' | 'right',
    text: string,
  },

  footerText?: string,
};