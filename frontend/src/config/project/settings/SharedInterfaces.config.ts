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
export interface SettingCard {
  type: ESettingCardType,

  // Visual
  title: string,
  description: string,

  size?: string,

  icon: string,
  color: string,

  documentationLink?: string,

  // Technical
  updater: (input: SettingUpdaterInput) => void,
  getter: () => Promise<boolean | string>,
};