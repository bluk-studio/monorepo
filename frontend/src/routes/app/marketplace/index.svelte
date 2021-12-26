<script lang="ts">
  // Importing modules
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Redirecting to /explore page
  onMount(() => {
    goto('/app/marketplace/explore');
  });
</script>