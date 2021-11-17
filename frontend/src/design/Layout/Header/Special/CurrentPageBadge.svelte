<script lang="ts">
  // Importing modules
  import SimpleIcon from 'src/design/Icon/SimpleIcon.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { AvailablePages } from 'src/stores';
  import { Pages, Categories } from 'src/config';
  import { onMount, onDestroy } from 'svelte';

  // Variables
  let popoverVisible: boolean = false;

  // Function, that'll redirect user
  // to page.url.
  function redirect(redirectUrl: string) {
    let url: string;
    eval(`url = \`${redirectUrl}\``);
    goto(url);
  };

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
    document.addEventListener('openPageExplorer', popoverSwitch);

    // Determining current category
    currentCategoryId = currentPage?.category;
  });

  onDestroy(() => {
    document.removeEventListener('openPageExplorer', popoverSwitch);
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

  // Current category
  let currentCategoryId: string;
  $: currentCategory = Categories.filter((x) => x.id == currentCategoryId)[0];

  // Determining current page
  $: currentPage = Pages.filter((x) => {
    return x.regex.test($page.path);
  })[0];
</script>

<!-- Current Page Badge Layout -->
<div class="mx-4 relative">
  <button id="currentPageBadge-button" on:click={() => popoverSwitch()} class="px-4 w-48 py-2 border-2 border-black flex items-center justify-center">
    <p class="text-sm text-black mr-2">{ currentPage?.title ?? 'Неизвестно' }</p>

    <SimpleIcon name="{ popoverVisible ? 'chevron-up' : 'chevron-down' }" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
  </button>

  <!-- Popover -->
  { #if popoverVisible }
    <div id="currentPageBadge-popover" transition:slide style="width: { $AvailablePages.list.length >= 6 ? '360%' : '180%' }; margin-top: -2px;" class="z-20 overflow-x-auto w-full absolute bg-gray-100 border-2 border-black pt-3 pb-2">
      <!-- Header -->
      { #if $AvailablePages.list.length < 6 }
        <div class="w-full px-2">
          <h1 class="text-md text-black font-medium">Страницы</h1>
          <p class="text-xs text-black opacity-80">Отображаем только доступные вам страницы</p>
        </div>
      { /if }

      { #if $AvailablePages.list.length >= 6 }
        <!-- List Categories -->
        <div class="w-full flex items-start justify-center">
          { #each Categories as category }
            { #if $AvailablePages.list.filter((x) => x.category == category.id).length > 0 }
              <!-- Show this category -->
              <div class="w-auto relative">
                <!-- Header -->
                <div class="w-full px-2">
                  <h1 class="text-md text-black font-medium">{ category.title }</h1>
                  <p class="text-xs text-black opacity-80">{ category.description }</p>      
                </div>

                <!-- Pages -->
                <div class="mt-4">
                  { #each $AvailablePages.list.filter((x) => x.category == category.id) as availablePage }
                    <div class="w-full border-t-2 border-gray-300 p-2">
                      <!-- Title -->
                      <div class="flex items-start justify-between">
                        <div class="flex items-start w-2/3">
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
                        { #if availablePage == currentPage }
                          <button class="px-2 py-1 bg-black flex items-center justify-center mt-0.5">
                            <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
                          
                            <p class="text-xs text-white ml-0.5">Вы тут</p>
                          </button>
                        { :else }
                          <button on:click={() => {
                            redirect(availablePage.url);
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
          { /each }
        </div>
      { :else }
        <div class="mt-4">
          <!-- List Available Pages -->
          { #each $AvailablePages.list as availablePage }
            <div class="w-full border-t-2 border-gray-300 p-2">
              <!-- Title -->
              <div class="flex items-start justify-between">
                <div class="flex items-start w-2/3">
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
                { #if availablePage == currentPage }
                  <button class="px-2 py-1 bg-black flex items-center justify-center mt-0.5">
                    <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
                  
                    <p class="text-xs text-white ml-0.5">Вы тут</p>
                  </button>
                { :else }
                  <button on:click={() => {
                    redirect(availablePage.url);
                  }} class="px-2 py-1 border-2 border-black flex items-center justify-center mt-0.5">
                    <p class="text-xs text-black mr-0.5">Перейти</p>

                    <SimpleIcon name="chevron-right" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
                  </button>
                { /if }
              </div>
            </div>
          { /each }
        </div>
      { /if }
    </div>
  { /if }
</div>