<script lang="ts">
  // Importing modules
  import SimpleIcon from 'src/design/Icon/SimpleIcon.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { AvailablePages } from 'src/stores';
  import { Pages } from 'src/config';
  import { onMount, onDestroy } from 'svelte';

  // Variables
  let popoverVisible: boolean = false;

  // Function, that'll switch our popover on if its off
  // and vise verca
  function popoverSwitch() {
    popoverVisible = popoverVisible ? false : true;
  };

  // Subscribing to page changes to reset popover 
  // visibility state
  page.subscribe(() => {
    if (popoverVisible) popoverVisible = false;
  });

  // onMount event
  onMount(() => {
    document.addEventListener('click', onClickListener);
  });

  // onDestroy event
  onDestroy(() => {
    document.removeEventListener('click', onClickListener);
  });

  // Function, that'll be passed into
  // global onclick listener
  function onClickListener(event) {
    if (!popoverVisible) return;

    const popoverElement = document.getElementById("currentPageBadge-popover");
    const buttonElement = document.getElementById("currentPageBadge-button");
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

  // Determining current page
  $: currentPage = Pages.filter((x) => {
    if (x.url instanceof Array) {
      if (x.url.includes($page.path)) {
        return true;
      };
    } else {
      if (x.url == $page.path) return true
    };

    return false
  })[0];
</script>

<!-- Current Page Badge Layout -->
<div class="mx-4 relative">
  <button id="currentPageBadge-button" on:click={() => popoverSwitch()} class="px-4 w-48 py-2 border-2 border-black flex items-center justify-center">
    <p class="text-sm text-black mr-2">{ currentPage?.title }</p>

    <SimpleIcon name="{ popoverVisible ? 'chevron-up' : 'chevron-down' }" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
  </button>

  <!-- Popover -->
  { #if popoverVisible }
    <div id="currentPageBadge-popover" transition:slide style="width: 180%; margin-top: -2px;" class="z-20 w-full absolute bg-gray-100 border-2 border-black pt-3 pb-2">
      <!-- Header -->
      <div class="w-full px-2">
        <h1 class="text-md text-black font-medium">Страницы</h1>
        <p class="text-xs text-black opacity-80">Отображены только доступные вам страницы.</p>
      </div>
      
      <!-- List Available Pages -->
      <div class="mt-4">
        { #each $AvailablePages.list as availablePage }
          <div class="w-full border-t-2 border-gray-300 p-2">
            <!-- Title -->
            <div class="flex items-start justify-between">
              <div class="flex items-start">
                { #if availablePage.icon }
                  <!-- Icon -->
                  <div style="background-color: { availablePage.iconColor ?? '#fbbf24' }" class="p-1.5 mr-2 mt-0.5 rounded-full">
                    <SimpleIcon name="{ availablePage.icon }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
                  </div>
                { /if }

                <div>
                  <h1 class="text-md text-black font-medium">{ availablePage.title }</h1>
                  <!-- Summary -->
                  { #if availablePage.description }
                    <p class="text-xs text-black opacity-80">{ @html availablePage.description }</p>
                  { /if }
                </div>
              </div>
            
              <!-- Button -->
              { #if availablePage.url instanceof Array ? availablePage.url.includes($page.path) : availablePage.url == $page.path }
                <button class="px-2 py-1 bg-black flex items-center justify-center mt-0.5">
                  <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
                
                  <p class="text-xs text-white ml-0.5">Вы тут</p>
                </button>
              { :else }
                <button on:click={() => {
                  goto(availablePage.url instanceof Array ? availablePage.url[0] : availablePage.url);
                }} class="px-2 py-1 border-2 border-black flex items-center justify-center mt-0.5">
                  <p class="text-xs text-black mr-0.5">Перейти</p>

                  <SimpleIcon name="chevron-right" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
                </button>
              { /if }
            </div>
          </div>
        { /each }
      </div>
    </div>
  { /if }
</div>