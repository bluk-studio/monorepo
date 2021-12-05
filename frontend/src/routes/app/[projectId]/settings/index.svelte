<script lang="ts">
  // Importing modules
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => goto(`${ $page.path }/general`, { replaceState: true }));
</script>