<script lang="ts">
  // Importing modules
  import SimpleIcon from "src/design/Icon/SimpleIcon.svelte";
  import CurrentPageBadge from "src/design/Layout/Header/Special/CurrentPageBadge.svelte";
  import { CurrentProfile } from "$stores/profile";
  
</script>

<!-- Application Header Layout -->
<header class="absolute z-10 inset-x-0 top-0 w-full flex items-center justify-between bg-gray-100 py-2 px-6">
  <!-- Left Panel -->
  <div class="flex items-stretch">
    <!-- Logotype -->
    <div class="flex items-center">
      <img src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1636810372/bluk-studio-black.svg" alt="bluk.studio white logotype" class="w-8 h-8">
    </div>

    <!-- { #if } -->
      <!-- Current project button -->
      <!-- <button class="ml-6 px-4 py-2 bg-black rounded-sm flex items-center justify-center">
        #Project name
        <h1 class="text-white text-sm mr-2">Paradise 2.0</h1>

        #Settings
        <div class="flex items-center">
          <SimpleIcon name="chevron-down" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </div>
      </button>

      #Current page
      <button class="mx-4 px-4 py-2 border-2 border-black flex items-center justify-center">
        <p class="text-sm text-black mr-2">Главная</p>

        <SimpleIcon name="chevron-down" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
      </button>

      #Command palette
      <button class="px-4 py-2 border-2 border-black flex items-center">
        <SimpleIcon name="command" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button> -->
    <!-- { :else if $CurrentProfile.projects && $CurrentProfile.projects.length > 0 } -->
      <!-- Choose project -->
      <!-- <button class="px-4 py-2 bg-black flex items-center rounded-sm mx-6">
        <p class="text-white text-sm mr-2">Выбрать сервер</p>

        <SimpleIcon name="chevron-down" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
      </button> -->

    <!-- { :else } -->
      <!-- Current page -->
      <CurrentPageBadge />
    <!-- { /if } -->
  </div>

  <!-- Right Panel -->
  <div class="flex items-stretch">
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