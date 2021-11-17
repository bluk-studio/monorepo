<script lang="ts">
  // Importing modules
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { RadialSpinner } from 'src/design';
  
  import { CreateProjectPages } from 'src/config/project';
  import type { CreateProjectPage } from 'src/config/project';

  // Variables
  let loaded = false;
  let currentPage: Partial<CreateProjectPage> = {};

  // Subscribing to page store to display
  // loading animation
  page.subscribe((page) => {
    const pathSplitted = page.path.split('/');
    
    if (pathSplitted[pathSplitted.length - 1] != 'create') {
      setTimeout(() => loaded = true, 250);
    
      // Getting information about current
      // page
      // - Animation yeah
      if (currentPage?.id != pathSplitted[pathSplitted.length - 1]) {
        loaded = false;
        setTimeout(() => loaded = true, 250);
      };
      currentPage = CreateProjectPages.filter((x) => x.id == pathSplitted[pathSplitted.length - 1])[0];
    } else {
      goto('/app/create/plan', { replaceState: true });
    };
  });
</script>

<div class="w-full h-full flex flex-col items-center py-12 justify-center bg-gradient-to-tr from-gray-900 to-black">
  <div class="w-1/3 relative overflow-y-auto overflow-x-hidden">
    <!-- Create Project Layout -->
    <div class="w-full bg-white rounded-sm py-6 flex flex-col items-center justify-center">
      <!-- Header -->
      <div class="w-full ml-3 text-left px-6 relative">
        { #if currentPage?.title && currentPage?.description }
          <h1 class="text-xl text-black font-medium">{ currentPage?.title }</h1>
          <p class="text-xs text-black opacity-80">{ currentPage?.description }</p>
        { :else }
          <!-- Placeholder -->
          <div class="w-full h-8 rounded-full bg-gray-200"></div>
          <div class="w-1/2 flex mt-2">
            <div class="w-2/3 h-6 rounded-full bg-gray-200"></div>
            <div class="w-1/3 h-6 rounded-full bg-gray-200"></div>
          </div>
        { /if }
      </div>

      <!-- Content -->
      <div class="w-full my-6">
        { #if !loaded }
          <div class="py-16 w-full flex justify-center">
            <RadialSpinner color="#000" size={20} />
          </div>
        { :else }
          <slot />
        { /if }
      </div>

      <!-- Footer -->
      <div class="w-full flex items-center justify-center">
        { #if loaded }
          { #each CreateProjectPages as page }
            { #if page.id == currentPage?.id }
              <div class="w-4 h-4 rounded-full bg-black mx-2"></div>
            { :else }
              <div on:click={() => {
                goto(`/app/create/${page.id}`);
              }} class="w-4 h-4 cursor-pointer rounded-full border-2 border-black mx-2"></div>
            { /if }
          { /each }
        { :else }
          <!-- Placeholders -->
          <div class="w-4 h-4 rounded-full bg-gray-200 mx-2"></div>
          <div class="w-4 h-4 rounded-full bg-gray-200 mx-2"></div>
          <div class="w-4 h-4 rounded-full bg-gray-200 mx-2"></div>
        { /if }
      </div>
    </div>
  </div>
</div>