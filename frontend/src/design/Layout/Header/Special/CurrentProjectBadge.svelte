<script lang="ts">
  // Importing modules
  import SimpleIcon from 'src/design/Icon/SimpleIcon.svelte';
  import { page } from '$app/stores';
  import { slide, fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';

  import { CurrentProject } from 'src/stores/project';

  // Variables
  let popoverVisible: boolean = false;

  // Function, that'll switch our popover on if its off
  // and vise verca
  function popoverSwitch() {
    document.removeEventListener('click', onClickListener);

    popoverVisible = popoverVisible ? false : true;
    
    // Adding click listener
    setTimeout(() => {
      if (popoverVisible) {
        document.addEventListener('click', onClickListener);
      };
    }, 500);
  };

  // Subscribing to page changes to reset popover 
  // visibility state
  page.subscribe(() => {
    if (popoverVisible) popoverVisible = false;
  });

  // onMount event
  onMount(() => {
    // Subscribing to custom event
    document.addEventListener('openCurrentProjectPopover', popoverSwitch);;
  });

  onDestroy(() => {
    document.removeEventListener('openCurrentProjectPopover', popoverSwitch);
  });

  // Function, that'll be passed into
  // global onclick listener
  function onClickListener(event) {
    if (!popoverVisible) return;

    const popoverElement = document.getElementById("currentProjectBadge-popover");
    const buttonElement = document.getElementById("currentProjectBadge-button");
    let targetElement = event.target;

    do {
      if (targetElement == popoverElement || targetElement == buttonElement) {
        return;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);

    // Clicked outside of component
    popoverVisible = false;
  };
</script>

{ #if $CurrentProject.loaded && $CurrentProject.project?._id != null }
  <!-- Current Page Badge Layout -->
  <div class="mx-2 relative">
    <button transition:fade id="currentProjectBadge-button" on:click={() => popoverSwitch()} class="px-4 w-48 h-full py-2 bg-black flex items-center justify-center">
      <!-- Project name -->
      <h1 class="text-white text-sm mr-2">{ $CurrentProject.project?.name }</h1>

      <SimpleIcon name="{ popoverVisible ? 'chevron-up' : 'chevron-down' }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
    </button>

    <!-- Popover -->
    { #if popoverVisible }
      <div id="currentProjectBadge-popover" transition:slide style="width: 360%; margin-top: -2px;" class="z-20 w-full overflow-hidden overflow-x-auto absolute bg-gray-100 border-2 border-black pt-3 pb-2">
        <p>Project popover</p>
      </div>
    { /if }
  </div>
{ /if }