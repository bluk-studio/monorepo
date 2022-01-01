<script lang="ts">
  // Importing modules
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  import { RadialSpinner } from 'src/design';
  
  import { CurrentProject } from 'src/stores/project';
  import { EditorStore } from 'src/modules/Editor';
  import type { EResourceType } from '@app/shared';

  import { CurrentRawPluginStore } from 'src/modules/Plugins';

  // Variables
  let loading = true;

  // Determining editor's resource
  onMount(() => {
    if (!$EditorStore.resourceId || $EditorStore.resourceType) {
      // Fetching current project (if exists)
      const projectId = $page.query.get('projectId');

      if (projectId) {
        CurrentProject.fetch(projectId);
      };
      
      // Trying to fetch resourceId and resourceType from page information
      const resourceId = $page.query.get('resourceId');
      const resourceType = $page.query.get('resourceType') as EResourceType;

      if (resourceId && resourceType) {
        // Updating store
        EditorStore.update(resourceId, resourceType);
      };

      loading = false;

      // Fetching information
      if (resourceType == 'RAW_PLUGIN') {
        // Fetching CurrentRawPlugin
        CurrentRawPluginStore.fetch();
      };
    };
  });
</script>

{ #if loading }
  <!-- Loading screen -->
  <div class="w-full h-full flex flex-col items-center justify-center">
    <RadialSpinner color="#000" size={15} />
  </div>
{ :else }
  <!-- Viewport -->
  <slot />
{ /if }