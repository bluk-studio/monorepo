import { writable } from 'svelte/store';
// import { page } from '$app/stores';
import { Pages } from 'src/config';

import type { IPage } from 'src/config';
import type { IProfile, IProject } from '@app/shared';

// Importing stores
import { ProfileProjects, CurrentProject } from 'src/stores/project';


export interface IAvailablePagesStore {
  list: Array<IPage>;
};

// Function, that'll handle store initialization
function _initialize() {
  const defaultStore = {
    list: []
  };
  const { subscribe, update } = writable(defaultStore);

  let profile: Partial<IProfile> = {};
  let projects: Array<IProject> = [];

  // +todo
  let project: { current: Partial<IProject>, state: Object } = {
    current: {},
    state: {}
  };

  // Function, that'll update our store

  // Subscribing to CurrentProfile
  // and ProfileProjects stores
  // to monitor changes to them
  ProfileProjects.subscribe((object) => {
    projects = object?.list ?? [];
    
    updateAvailability();
  });

  CurrentProject.subscribe((object) => {
    if (object.loaded) {
      project.current = object.project;

      updateAvailability();
    };
  });

  // Function, that'll use local profile and
  // projects variables to determine which pages
  // are available and which are not
  function updateAvailability() {
    let available: Array<IPage> = [];

    Pages.forEach((page) => {
      // check projectSelector
      if (page.checkName == 'projectSelector') {
        if (projects?.length > 0) {
          available.push(page);
        };
      // check createProject
      } else if (page.checkName == 'createProject') {
        available.push(page);
      // check currentProject
      } else if (page.checkName == 'currentProject') {
        if (project?.current?._id != null) {
          available.push(page);
        };
      // check alwaysShow
      } else if (page.checkName == 'alwaysShow') {
        available.push(page);
      };
    });

    updateList(available);
  };

  // Function, that'll update our AvailablePages
  // list
  function updateList(pages: Array<IPage>) {
    update((object) => {
      object.list = pages;
      return object;
    });
  };

  return {
    subscribe,
  };
};

export const AvailablePages = _initialize();