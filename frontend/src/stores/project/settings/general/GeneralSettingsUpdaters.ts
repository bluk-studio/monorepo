import type { SettingUpdaterInput } from "src/config";

// Exporting properties updates

// - online-mode
export function toggleOnlineMode(input: SettingUpdaterInput) {
  console.log('update online mode');
};

// - whitelist
export function toggleWhitelist(input: SettingUpdaterInput) {
  console.log('toggle whitelist');
};

// - 24/7 mode
export function toggleFullday(input: SettingUpdaterInput) {
  console.log('toggle 24/7 mode');
};

// - public address
export function updatePublicAddress(input: SettingUpdaterInput) {
  console.log('update public address');
};
