<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { CurrentProject, CurrentWorkerState } from 'src/stores';

  import { RadialSpinner } from 'src/design';

  // onMount event
  onMount(() => {
    // Fetching information about curren
    // project
    CurrentProject.fetch($page.params.projectId);

    // Subscribing to CurrentProject store
    CurrentProject.subscribe((store) => {
      if (store.loaded) {
        // Trying to fetch WorkerState
        // CurrentWorkerState.fetch($page.params.projectId);
      };
    });
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
  <RadialSpinner color="#000" size={15} />
</div>
{ :else }
  <!-- Waiting for Project Worker to spin up -->
  <!-- { #if $CurrentWorkerState?.state != 'RUNNING' }
    <div class="w-full h-full flex flex-col items-center justify-center">
      <RadialSpinner color="#000" size={15} />

      #Text
      <div class="text-center mt-4 w-1/3">
        <h1 class="text-md font-medium text-black">Запускаем сервер...</h1>
        <p class="text-sm text-black opacity-80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus maiores sunt numquam assumenda enim facere.</p>
      </div>
    </div>
  { :else } -->
    <slot />
  <!-- { /if } -->
{ /if }