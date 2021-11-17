<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  // Redirecting user to /app/${ projectId }/editor/explorer page
  onMount(() => goto(`${ $page.path }/explorer`, { replaceState: true }));
</script>