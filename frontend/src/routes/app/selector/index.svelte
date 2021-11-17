<script lang="ts">
  // Importing modules
  import { SimpleIcon, RadialSpinner } from "src/design";
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import { ProfileProjects } from "src/stores";

  onMount(() => {
    // Subscribing to ProfileProjects
    ProfileProjects.subscribe((object) => {
      if (object.loaded) {
        if (!object.list?.length) {
          goto('/app/create');
        } else {
          loaded = true;
        };
      }
    });
  });

  let loaded = false;
</script>

<!-- Project Selector Layout -->
<div class="w-full h-full">
  <!-- Loading Spinner -->
  { #if !loaded }
    <div class="flex justify-center">
      <RadialSpinner color="#fff" />
    </div>
  { :else }
    <!-- Header section -->
    <section class="w-full flex items-stretch justify-between mt-4 px-2">
      <!-- Filters -->
      <div class="flex items-stretch">
        <!-- Search bar -->
        <div class="w-full relative bg-gray-200 rounded-sm px-2 py-2 flex items-center">
          <SimpleIcon name="search" attrs={{ class: "w-4 h-4 text-black mr-2 opacity-40", "stroke-width": "2.5" }} />

          <input class="bg-gray-200" placeholder="Поиск..." type="text">
        </div>
      </div>

      <!-- Create new project -->
      <div class="flex items-stretch">
        <!-- Get invite to other project -->
        <button class="mx-2 px-4 cursor-not-allowed opacity-80 flex items-center justify-center border-2 border-black">
          <p class="text-black text-sm">Применить приглашение</p>
        </button>

        <!-- Create new project -->
        <button on:click={() => {
          goto('/app/create')
        }} class="mx-2 px-4 flex items-center justify-center bg-black">
          <p class="text-white text-sm mr-2">Создать сервер</p>

          <SimpleIcon name="layers" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </button>
      </div>
    </section>

    <!-- projects section -->
    <section class="w-full h-auto mt-2 overflow-y-auto overflow-x-hidden flex flex-wrap items-stretch">
      { #each $ProfileProjects.list as project }
        <!-- Project panel -->
        <div class="w-1/6 bg-white border-4 border-gray-200 p-4 m-2">
          <!-- Header -->
          <div class="w-full flex items-center justify-between">
            <!-- Icon -->
            <div class="w-10 h-10 rounded-sm bg-red-500">
            </div>

            <!-- Settings -->
            <div class="p-3 rounded-full bg-gray-100">
              <SimpleIcon name="settings" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </div>
          </div>

          <!-- Summary -->
          <div class="my-4">
            <h1 class="text-md text-black font-medium">{ project.name }</h1>
            <p class="text-xs text-black opacity-80">{ project.description ?? 'Описание отсутствует...' }</p>
          </div>

          <!-- Buttons -->
          <div class="w-full">
            <button on:click={() => {
              goto(`/app/${project._id}`)
            }} class="px-2 py-1 border-2 border-black flex items-center justify-center">
              <p class="text-black text-xs mr-0.5">Выбрать</p>

              <SimpleIcon name="chevron-right" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </button>
          </div>
        </div>
      { /each }

      <!-- Add new project -->
    </section>
  { /if }
</div>