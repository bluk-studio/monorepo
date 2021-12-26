<script lang="ts">
  // Importing modules
  import SimpleIcon from "src/design/Icon/SimpleIcon.svelte";
  import CurrentPageBadge from "src/design/Layout/Header/Special/CurrentPageBadge.svelte";
  
  import { EditorStore, EditorDashboardStore } from 'src/modules/Editor';
  import { CurrentProfile, CurrentProject } from "src/stores";

  import { fade } from 'svelte/transition';
</script>

<!-- Application Header Layout -->
<header class="absolute z-10 inset-x-0 top-0 w-full flex items-center justify-between bg-gray-100 py-2 px-6">
  <!-- Left Panel -->
  <div class="flex items-stretch">
    <!-- Logotype -->
    <div class="flex items-center">
      <img src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1636810372/bluk-studio-black.svg" alt="bluk.studio white logotype" class="w-8 h-8">
    </div>

    <!-- Current project button (if set) -->
    { #if $CurrentProject.loaded && $CurrentProject.project?._id != null }
      <!-- Current project button -->
      <button transition:fade class="ml-6 px-4 py-2 bg-black rounded-sm flex items-center justify-center">
        <!-- Project name -->
        <h1 class="text-white text-sm mr-2">{ $CurrentProject.project?.name }</h1>

        <!-- Settings -->
        <div class="flex items-center">
          <SimpleIcon name="chevron-down" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </div>
      </button>
    { /if }

    <!-- Current page -->
    <CurrentPageBadge />
  </div>

  <!-- Right Panel -->
  <div class="flex items-stretch">
    <!-- Current dashboard -->
    { #if $EditorDashboardStore.dashboardId }
      <button transition:fade class="mr-6 px-4 py-2 bg-black rounded-sm flex items-center justify-center">
        <!-- Dashboard -->
        <div class="mr-2 text-left">
          <h1 class="text-white text-sm">{ $EditorDashboardStore.title.slice(0, 20) }...</h1>
          <p class="text-xs text-white opacity-80">Lorem ipsum dolor sit.</p>
        </div>

        <!-- Settings -->
        <div class="flex items-center">
          <SimpleIcon name="chevron-down" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </div>
      </button>
    { /if }

    <!-- User Account -->
    <button class="px-4 py-2 bg-black rounded-sm flex items-center justify-center">
      <!-- Avatar -->
      <div class="w-7 h-7 bg-red-500 rounded-full"></div>

      <!-- Username -->
      <div class="mx-3 text-left">
        <h1 class="text-xs text-white font-medium">{ $CurrentProfile?.profile?.username ?? 'Default profile' }</h1>
        <p class="text-xs text-white opacity-80">{ $CurrentProfile?.profile?.email }</p>
      </div>

      <!-- Settings button -->
      <div class="flex items-center">
        <SimpleIcon name="chevron-down" attrs={{ class: "w-5 h-5 text-white", "stroke-width": "2.5" }} />
      </div>
    </button>
  </div>
</header>