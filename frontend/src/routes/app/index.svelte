<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    // Redirecting user to /app/selector page.
    // User'll need to select project and will be redirected
    // to /app/${ projectId }/dashboard url
    goto('/app/selector');
  });
</script>