<script lang="ts">
  // Importing modules
  import { CurrentProject, ProjectDashboard } from 'src/stores';
  import { SimpleIcon } from 'src/design';
  import { onMount } from 'svelte';

  import Grid from "svelte-grid";
  import GridHelp from "svelte-grid/build/helper/index.mjs";

  const COLS = 6;

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  };

  // Function, that'll handle widgets synchronization
  async function syncWidgets() {
    // Serializing items
    const serialized = gridItems.map((item) => {
      return {
        type: item.type,
        x: item[COLS].x ?? 0,
        y: item[COLS].y ?? 0,
        width: item[COLS].w ?? 2,
        height: item[COLS].h ?? 2,
      };
    });

    // Updating
    await ProjectDashboard.updateLayout(String($ProjectDashboard._id), serialized);
  };

  // onMount function
  onMount(async () => {
    // Fetching ProjectDashboardConfig
    await ProjectDashboard.fetch(String($CurrentProject.project._id));
    
    gridItems = $ProjectDashboard.widgets.map((widget) => {
      return {
        [COLS]: GridHelp.item({ x: widget.x, y: widget.y, w: widget.width, h: widget.height }),
        id: makeid(4),
        type: widget.type,
      };
    });
  });

  let gridItems = [];
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

    <!-- HeroWidget Controls -->
    <div class="flex items-stretch">
      <!-- Settings -->
      <button class="mx-2 px-3 py-1.5 border-2 border-black flex items-center justify-self-center">
        <p class="text-black text-sm mr-1.5">Настройки</p>

        <SimpleIcon name="settings" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
      </button>

      <!-- Hide -->
      <button class="mx-2 px-3 py-1.5 bg-black flex items-center justify-center">
        <p class="text-sm text-white mr-1.5">Скрыть</p>

        <SimpleIcon name="chevron-up" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
      </button>
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
      <!-- Editor -->
      <button class="mx-2 px-2 py-1.5 bg-black flex items-center justfiy-center">
        <SimpleIcon name="code" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        
        <p class="text-sm text-white ml-1.5">Редактор</p>
      </button>

      <!-- Players -->
      <button class="mx-2 px-2 py-1.5 border-2 border-black flex items-center justify-center">
        <SimpleIcon name="user" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        
        <p class="text-sm text-black ml-1.5">Игроки</p>
      </button>

      <!-- Settings -->
      <button class="mx-2 px-2 py-1.5 border-2 border-black flex items-center justify-center">
        <SimpleIcon name="settings" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        
        <p class="text-sm text-black ml-1.5">Настройки</p>
      </button>

      <!-- More -->
      <button on:click={() => {
        document.dispatchEvent(new Event('openPageExplorer'));
      }} class="mx-2 px-2 py-1.5 border-2 border-black flex items-center justify-center">
        <SimpleIcon name="external-link" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        
        <p class="text-sm text-black ml-1.5">Больше</p>
      </button>
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
<section class="w-full relative mb-8">
  <Grid on:pointerup={syncWidgets} bind:items={gridItems} rowHeight={100} let:item let:dataItem cols={[[,6]]} fillSpace={true}>
    <div class="w-full h-full bg-gray-200 rounded-sm">
      <!-- +todo -->
      <!-- Players widget -->
      { #if dataItem.type == 'PLAYERS' }
        <!-- Header -->
        <div class="w-full border-b-2 border-gray-300 py-2 px-4 flex items-center justify-between">
          <h1 class="text-md text-black font-medium">Игроки</h1>

          <div class="flex items-center">
            <button class="px-3 py-1 border-2 border-black">
              <p class="text-xs text-black">Настройки</p>
            </button>
          </div>
        </div>

        <!-- Player list -->
        <div class="mt-4 px-4">
          <!-- Player #1 -->
          <div class="my-3 flex items-center justify-between">
            <!-- Player information -->
            <div class="flex items-center">
              <img src="https://crafatar.com/avatars/1b42ff62-b4cb-4b8e-8fbd-efd24e70ced2" alt="" class="w-8 h-8 rounded-sm">
              
              <div class="ml-2">
                <h1 class="text-base text-black font-medium">SniperFox213</h1>
                
                <!-- Tags -->
                <div class="flex items-stretch">
                  <!-- Status -->
                  <div class="mr-1 rounded-full px-2 py-0.5 bg-indigo-400">
                    <p class="text-xs text-white">Оператор</p>
                  </div>

                  <!-- Play time -->
                  <div class="rounded-full px-2 py-0.5 bg-yellow-400">
                    <p class="text-xs text-white">Играет 4 часов</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Player controls -->
            <div class="flex items-center">
              <SimpleIcon name="x-circle" attrs={{ class: "w-5 h-5 text-black mr-2", "stroke-width": "2.5" }} />
              <SimpleIcon name="settings" attrs={{ class: "w-5 h-5 text-black ml-2 ", "stroke-width": "2.5" }} />
            </div>
          </div>

          <!-- Player #2 -->
          <div class="my-3 flex items-center justify-between">
            <!-- Player information -->
            <div class="flex items-center">
              <img src="https://crafatar.com/avatars/1b42ff62-b4cb-4b8e-8fbd-efd24e70ced2" alt="" class="w-8 h-8 rounded-sm">
              
              <div class="ml-2">
                <h1 class="text-base text-black font-medium">Lol</h1>
                
                <!-- Tags -->
                <div class="flex items-stretch">
                  <!-- Play time -->
                  <div class="rounded-full px-2 py-0.5 bg-yellow-400">
                    <p class="text-xs text-white">Играет 6 часов</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Player controls -->
            <div class="flex items-center">
              <SimpleIcon name="x-circle" attrs={{ class: "w-5 h-5 text-black mr-2", "stroke-width": "2.5" }} />
              <SimpleIcon name="settings" attrs={{ class: "w-5 h-5 text-black ml-2 ", "stroke-width": "2.5" }} />
            </div>
          </div>
        </div>

      <!-- Controls widget -->
      { :else if dataItem.type == 'controls' }

      { /if }
    </div>
  </Grid>
</section>