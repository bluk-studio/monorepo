<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { CurrentProject } from 'src/stores';

  import { RadialSpinner } from 'src/design';

  // onMount event
  onMount(() => {
    // Fetching information about curren
    // project
    CurrentProject.fetch($page.params.projectId);
  });

  page.subscribe((object) => {
    const regexp = /\/app\/[\s\S]{24}\/[\s\S]+/;

    if (!regexp.test(object.path)) {
      CurrentProject.clear();
    };
  });

  $: loaded = $CurrentProject.loaded
</script>

<!-- Loading Spinner -->
{ #if !loaded }
  <div class="w-full h-full flex items-center justify-center">
    <RadialSpinner color="#000" />
  </div>
{ :else }
  <slot />
{ /if }