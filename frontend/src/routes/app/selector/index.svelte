<script lang="ts">
  // Importing modules
  import { SimpleIcon, RadialSpinner } from "src/design";
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import { CurrentProfile } from "src/stores";

  onMount(() => {
    if (!$CurrentProfile?.profile?.projects || $CurrentProfile?.profile?.projects?.length < 1) {
      goto('/app/create');
    } else {
      loaded = true;
    };
  });

  let loaded = false;
</script>

<!-- Project Selector Layout -->
<div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-gray-900 to-black">
  <div class="w-1/3 relative">
    <!-- Loading Spinner -->
    { #if !loaded }
      <div class="flex justify-center">
        <RadialSpinner color="#fff" />
      </div>
    { :else }
      <p>Loaded</p>
      <!-- { #if $CurrentProfile.projects.length > 0 } -->
        <!-- Projects list -->
      <!-- { /if } -->
    { /if }
  </div>
</div>