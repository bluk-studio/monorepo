<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { CurrentProject } from '$stores/project';

  // Redirecting user to /app/editor?projectId${ projectId }
  onMount(() => goto(`/app/editor?projectId=${ $page.params.projectId ?? $CurrentProject.project?._id }`, { replaceState: true }));
</script>