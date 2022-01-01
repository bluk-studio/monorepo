<script lang="ts">
  // Importing modules
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  import { CurrentProfile, ProfileProjects } from 'src/stores';
  
  import { EditorHeader, ApplicationHeader, RadialSpinner } from 'src/design';
  import { SessionConnection } from 'src/modules/Session';

  onMount(() => {
    // Trying to fetch profile
    // information...
    CurrentProfile.fetchMe()
      .then(() => {
        // Fetching ProfileProjects
        ProfileProjects.fetch();

        // Starting session connection
        SessionConnection.initialize();
      })
      .catch(() => {
        goto('/login');
      });
  });
</script>

<main class="flex flex-col">
  { #if $CurrentProfile?.loggedIn }
    { #if $SessionConnection.connected }
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
      <div class="w-full h-screen flex flex-col items-center justify-center">
        <RadialSpinner color="#000" size={15} />
        <p class="text-sm text-black mt-2">Подключение...</p>
      </div>
    { /if }
  { :else }
    <!-- Loading spinner -->
    <div class="w-full h-screen flex items-center justify-center">
      <RadialSpinner color="#000" size={15} />
    </div>
  { /if }
</main>