<script lang="ts">
  // Importing modules
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  import { CurrentProfile } from 'src/stores';
  import type { ICurrentProfile } from '@app/shared';

  onMount(async () => {
    // Checking if current page
    // contains token query
    const token = $page.query.get('token');
    
    if (!token) {
      // Sending user to authorize page
      const resourceId = "617a54db957b58a8819eafe9";
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