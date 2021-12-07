import type { InputUpdaterPayload, TogglerUpdaterPayload } from "src/config";
import { client } from 'src/stores/graphql';
import { UpdateOnlineMode, IUpdateOnlineModeMutationResponse, UpdateWhitelist, IUpdateWhitelistMutationResponse, UpdateServerAddress, IUpdateServerAddressMutationResponse } from 'src/queries';
import { CurrentProject } from "src/stores/project";

// Exporting properties updates

// - online-mode
export async function toggleOnlineMode(input: TogglerUpdaterPayload): Promise<boolean> {
  return new Promise((resolve) => {
    // Getting currentProject _id
    CurrentProject.subscribe(async ({ project }) => {
      // Updating
      const response = (await client.mutate(UpdateOnlineMode, { 
        variables: {
          projectId: project._id,
          value: !input.enabled,
        },
      })) as IUpdateOnlineModeMutationResponse;
  
      resolve(response.data.UpdateServerSettings.server.onlineMode);
    });
  });
};

// - whitelist
export function toggleWhitelist(input: TogglerUpdaterPayload): Promise<boolean> {
  return new Promise((resolve) => {
    // Getting currentProject _id
    CurrentProject.subscribe(async ({ project }) => {
      // Updating
      const response = (await client.mutate(UpdateWhitelist, { 
        variables: {
          projectId: project._id,
          value: !input.enabled,
        },
      })) as IUpdateWhitelistMutationResponse;
  
      resolve(response.data.UpdateServerSettings.server.whitelist);
    });
  });
};

// - public address
export async function updatePublicAddress(input: InputUpdaterPayload): Promise<string> {
  return new Promise((resolve) => {
    // Getting currentProject _id
    CurrentProject.subscribe(async ({ project }) => {
      // Updating
      const response = (await client.mutate(UpdateServerAddress, { 
        variables: {
          projectId: project._id,
          value: input.value,
        },
      })) as IUpdateServerAddressMutationResponse;
  
      resolve(response.data.UpdateServerSettings.server.address);
    });
  });
};
