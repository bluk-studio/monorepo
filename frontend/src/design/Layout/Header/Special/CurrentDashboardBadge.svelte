<script lang="ts">
  // Importing modules
  import SimpleIcon from 'src/design/Icon/SimpleIcon.svelte';
  import { page } from '$app/stores';
  import { slide, fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import RadialSpinner from 'src/design/Loaders/RadialSpinner.svelte';

  import { CurrentDashboardStore, TypedDashboardsStore } from 'src/modules/Dashboards';

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
    document.addEventListener('openDashboardsPopover', popoverSwitch);

    // Subscribing to CurrentDashboardStore
    CurrentDashboardStore.subscribe((dashboard) => {
      if (!dashboard.type) return;

      // Fetching dashboards
      TypedDashboardsStore.fetch(dashboard.type);
    });
  });

  onDestroy(() => {
    document.removeEventListener('openDashboardsPopover', popoverSwitch);
  });

  // Function, that'll be passed into
  // global onclick listener
  function onClickListener(event) {
    if (!popoverVisible) return;

    const popoverElement = document.getElementById("dashboardsList-popover");
    const buttonElement = document.getElementById("dashboardsList-button");
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

  // dashboardName function
  function dashboardName() {
    switch ($CurrentDashboardStore.type) {
      case 'PROJECT':
        return 'Проект';
      
      case 'CODE_EDITOR':
        return 'Редактор кода';
      
      case 'VISUAL_EDITOR':
        return 'Визуальный редактор';
    };
  };

  // setCurrentDashboard function
  async function setCurrentDashboard(dashboardId: string) {
    // Disabling popover
    popoverVisible = false;

    CurrentDashboardStore.setUpdatingState(true);

    // Updating current dashboard
    await CurrentDashboardStore.setCurrentDashboard(dashboardId);

    // Fetching it
    await CurrentDashboardStore.fetch($CurrentDashboardStore.type, $CurrentDashboardStore.resourceId);
  
    // Timeout to let everything load and render
    setTimeout(() => {
      CurrentDashboardStore.setUpdatingState(false);
    }, 500);
  };
</script>

{ #if $CurrentDashboardStore.id }
  <!-- Current Page Badge Layout -->
  <div class="mx-2 relative">
    <button transition:fade id="dashboardsList-button" on:click={() => popoverSwitch()} class="px-4 w-48 h-full py-2 bg-black flex items-center justify-between">
      <!-- Dashboard name -->
      <div class="text-left">
        <h1 class="text-white text-sm mr-2">{ $CurrentDashboardStore.name.slice(0, 16) }{ $CurrentDashboardStore.name.length > 16 ? '...' : '' }</h1>
        <p class="text-xs text-white opacity-80">{ dashboardName() }</p>
      </div>

      <!-- Settings -->
      <div class="flex items-center">
        <SimpleIcon name="{ popoverVisible ? 'chevron-up' : 'chevron-down' }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
      </div>
      </button>

    <!-- Popover -->
    { #if popoverVisible }
      <div id="dashboardsList-popover" transition:slide style="width: 180%; margin-top: -2px;" class="z-20 w-full overflow-hidden overflow-x-auto absolute bg-gray-100 border-2 border-black pt-3 pb-2">
        <!-- Explanation -->
        <div class="w-full px-2">
          <div class="flex items-center">
            <h1 class="text-lg text-black font-medium">Дашборды</h1>

            <!-- Dashboard Type badge -->
            <div class="bg-black px-1 py-0.5 ml-2 rounded-md flex items-center justify-center">
              <p class="text-xs text-white">{ dashboardName() }</p>
            </div>
          </div>

          <p class="text-xs text-black opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, exercitationem.</p>
        </div>

        <!-- List -->
        { #if $TypedDashboardsStore.list?.length > 0 }
          <div class="mt-4">
            { #each $TypedDashboardsStore.list as dashboard }
              <!-- Dashboard entry -->
              <div class="w-full py-2 px-4 flex items-center justify-between border-t-2 border-gray-300">
                <!-- Title -->
                <div>
                  <h1 class="text-sm text-black font-medium">{ dashboard.name.slice(0, 20) }{ dashboard.name?.length > 20 ? '...' : '' }</h1>
                  <p class="text-xs text-black opacity-80">Lorem ipsum dolor sit.</p>
                </div>

                <!-- Buttons -->
                <div class="flex items-stretch justify-center">
                  <!-- Choosed/Choose button -->
                  { #if String($CurrentDashboardStore.id) == String(dashboard._id) }
                    <!-- Edit button -->
                    <button class="mr-2 px-2 py-1.5 border-2 border-black flex items-center justify-center">
                      <SimpleIcon name="edit-2" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
                    </button>

                    <!-- Choosed -->
                    <button class="px-2 py-1.5 bg-black flex items-center justify-center">
                      <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
                    </button>
                  { :else }
                    <!-- Choose button -->
                    <button on:click={() => {
                      if (!$CurrentDashboardStore.updating) setCurrentDashboard(String(dashboard._id));
                    }} class="px-3 py-1.5 border-2 border-black flex items-center justify-center">
                      <p class="text-xs text-black mr-1.5">Выбрать</p>

                      <SimpleIcon name="chevron-right" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
                    </button>
                  { /if }
                </div>
              </div>

            { /each }
          </div>
        { :else }
          <p>empty</p>
        { /if }
      </div>
    { /if }
  </div>
{ /if }