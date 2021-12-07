// Importing modules
import { FetchServerAddress, IFetchServerAddressData, IOnlineModeData, IOnlineModeResponse, OnlineMode } from 'src/queries';
import { IWhitelistData, Whitelist } from 'src/queries/Project/Settings/General/Whitelist.query';
import { CurrentProject } from 'src/stores';
import { client } from 'src/stores/graphql';

// Exporting GeneralSettings getters

// - online-mode
export async function getOnlineMode(): Promise<boolean> {
  return new Promise((resolve) => {
    // +todo
    CurrentProject.subscribe(({ project }) => {
      const projectId = project._id;
      if (!projectId) return;

      // Getting non-cached information about this setting
      client.query<IOnlineModeData>(OnlineMode, { variables: { projectId } }).subscribe((response) => {
        // Waiting for response to finish loading
        if (response.loading) return;

        if (!response.error) {
          resolve(response.data?.Project?.settings.server.onlineMode ?? false);
        } else {
          // +todo error handling
          console.log('error while making request');
        };
      });
    });
  })
};

// - whitelist
export async function getWhitelist(): Promise<boolean> {
  return new Promise((resolve) => {
    // +todo
    CurrentProject.subscribe(({ project }) => {
      const projectId = project._id;
      if (!projectId) return;

      // Getting non-cached information about this setting
      client.query<IWhitelistData>(Whitelist, { variables: { projectId } }).subscribe((response) => {
        // Waiting for response to finish loading
        if (response.loading) return;

        if (!response.error) {
          resolve(response.data?.Project?.settings.server.whitelist ?? false);
        } else {
          // +todo error handling
          console.log('error while making request');
        };
      });
    });
  })
};

// - named address
export async function getPublicAddress(): Promise<string> {
  return new Promise((resolve) => {
    // +todo
    CurrentProject.subscribe(({ project }) => {
      const projectId = project._id;
      if (!projectId) return;

      // Getting non-cached information about this setting
      client.query<IFetchServerAddressData>(FetchServerAddress, { variables: { projectId } }).subscribe((response) => {
        // Waiting for response to finish loading
        if (response.loading) return;

        if (!response.error) {
          resolve(response.data?.Project?.settings.server.address ?? '');
        } else {
          // +todo error handling
          console.log('error while making request');
        };
      });
    });
  })
};