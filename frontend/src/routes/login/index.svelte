<script lang="ts">
  // Importing modules
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  import { CurrentProfile } from 'src/stores';
  import type { ICurrentProfile } from 'src/stores';

  onMount(async () => {
    // Checking if current page
    // contains token query
    const token = $page.query.get('token');
    
    if (!token) {
      // Sending user to authorize page
      // +todo move this to config
      const resourceId = "61c1ba6c088cb169e45c4e12";
      goto(`https://cloud.odzi.dog/auth/v1/${resourceId}`);
    } else {
      // Trying to authorize user using
      // given token.

      // Updating user store
      CurrentProfile.authorize(token);

      // Redirecting user to /app route
      CurrentProfile.subscribe((object: ICurrentProfile) => {
        if (object.loggedIn) goto('/app')
      });
    };
  });
</script>