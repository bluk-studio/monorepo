<script lang="ts">
  // Importing modules
  import { CurrentProject } from 'src/stores';
  import { SimpleIcon, WidgetsContainer } from 'src/design';
  import { InfoFooterButtons } from '$config/project';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  $: project = $CurrentProject.project;
</script>

<!-- Header Section -->
<section class="w-full bg-gray-200 px-2 py-4">
  <!-- Header -->
  <div class="w-full flex items-center justify-between pb-8">
    <!-- HeroWidget title -->
    <div>
      <h1 class="text-xl text-black font-medium">Информация</h1>
      <p class="text-xs text-black opacity-80">Главная информация о сервере</p>
    </div>
  </div>

  <!-- Server Information -->
  <div>
    <!-- Name -->
    <div class="px-2 flex items-start">
      <!-- Icon -->
      <div class="w-10 h-10 rounded-sm bg-red-500"></div>

      <!-- Text -->
      <div class="ml-2">
        <h1 class="text-2xl text-black font-medium">{ project.name }</h1>
        <p class="text-sm text-black opacity-80">{ project.description ?? '' }</p>
      </div>
    </div>

    <!-- Fast stats -->
    <div class="w-full flex items-center mt-4">
      <!-- IP -->
      <div class="mx-1 flex items-center justify-center rounded-full bg-white px-3 py-1">
        <SimpleIcon name="globe" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />

        <p class="text-sm text-black ml-1.5">paradise.bluk.studio</p>
      </div>

      <!-- Players -->
      <div class="mx-1 relative flex items-center justify-center rounded-full bg-white px-3 py-1">
        <div class="relative flex items-center mr-1.5">
          <!-- Avatars -->
          <div class="w-4 h-4 relative">
            <img src="https://crafatar.com/avatars/1b42ff62-b4cb-4b8e-8fbd-efd24e70ced2" alt="" class="absolute w-4 h-4 rounded-sm">
          </div>

          <div class="w-4 h-4 relative">
            <img src="https://crafatar.com/avatars/65fd84d5-5904-4391-b84a-ab52ffc0a7e9" alt="" class="absolute w-4 h-4 rounded-sm">
          </div>

          <div class="w-4 h-4 relative">
            <img src="https://crafatar.com/avatars/f6199c41-2d00-40b0-9d58-c4fd069c852c" alt="" class="absolute w-4 h-4 rounded-sm">
          </div>
        </div>

        <p class="text-black text-sm">10 игроков</p>
      </div>

      <!-- Status -->
      <div class="mx-1 flex items-center justify-center rounded-full bg-white px-3 py-1">
        <div class="w-4 h-4 mr-1.5 rounded-full bg-green-500"></div>

        <p class="text-black text-sm">Включён</p>
      </div>
    </div>
  </div>

  <!-- Divider -->
  <div style="height: 2px;" class="w-full bg-gray-300 my-4 mx-2"></div>

  <div class="flex items-stretch justify-between">
    <!-- Starred Links -->
    <div class="flex items-stretch">
      { #each InfoFooterButtons as button }
        <button on:click={() => {
          if (button.url) {
            goto(`/app/${$page.params.projectId}/${button.url}`);
          } else if (button.click) {
            button.click();
          };
        }} class="mx-2 px-2 py-1.5 { button.isGhost ? 'border-2 border-black text-black' : 'text-white bg-black' } flex items-center justfiy-center">
          <SimpleIcon name="{ button.icon }" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
          
          <p class="text-sm ml-1.5">{ button.title }</p>
        </button>
      { /each }
    </div>

    <!-- Basic controls -->
    <div class="flex items-stretch">
      <!-- Stop -->
      <button class="mx-2 px-2 py-1.5 bg-red-500 flex items-center justify-center">
        <SimpleIcon name="pause" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />

        <p class="text-sm text-white ml-1.5">Выключить</p>
      </button>
    </div>
  </div>
</section>

<!-- Widgets Section -->
<WidgetsContainer type={'PROJECT'} />