import type { Subscriber } from "svelte/store";

// Exporting FetchStore helper
export const FetchStore = (subscribe: Subscriber<any>) => {
  return new Promise((resolve) => {
    subscribe((object) => {
      resolve(object);
    });
  });
};