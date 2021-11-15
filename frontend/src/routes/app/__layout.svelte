<script lang="ts">
  // Importing modules
  import { CurrentProfile } from 'src/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { EditorHeader, ApplicationHeader } from 'src/design';

  onMount(() => {
    // Trying to fetch profile
    // information...
    CurrentProfile.fetchMe()
      .catch(() => {
        goto('/login');
      });
  });
</script>

<main class="flex flex-col">
  { #if $CurrentProfile?.loggedIn }
    <!-- 
      Header
      - Show Editor header when we are in editor mode
      otherwise show Application header
    -->
    { #if $page.path.includes('editor') }
      <EditorHeader />
    { :else }
      <ApplicationHeader />
    { /if }

    <!-- Content -->
    <div class="w-full h-screen relative overflow-y-auto pt-16">
      <slot />
    </div>
  { :else }
    <!-- Loading spinner -->
    <p>Getting profile information...</p>
  { /if }
</main>