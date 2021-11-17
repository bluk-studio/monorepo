<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  // Redirecting user to /app/${projectId}/dashboard page
  onMount(() => goto(`${ $page.path }/dashboard`, { replaceState: true }));
</script>