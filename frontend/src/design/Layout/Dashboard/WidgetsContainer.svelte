<script lang="ts">
  // Importing modules
  import { SimpleIcon } from 'src/design';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import RadialSpinner from 'src/design/Loaders/RadialSpinner.svelte';

  import Grid from "svelte-grid";
  import GridHelp from "svelte-grid/build/helper/index.mjs";
  
  import { CurrentDashboardStore } from 'src/modules/Dashboards';
  import { ConsoleTile, PlayersTile, ControlsTile, CodeEditorTile } from './Widgets';

  // Variables
  let loading = true;
  let gridItems = [];

  const COLS = 6;

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    
    return result;
  };

  // Function, that'll handle widgets synchronization
  async function syncWidgets() {
    // Serializing items
    const serialized = gridItems.map((item) => {
      return {
        type: item.type,
        enabled: true,
        x: item[COLS].x ?? 0,
        y: item[COLS].y ?? 0,
        width: item[COLS].w ?? 2,
        height: item[COLS].h ?? 2,
      };
    });

    // Updating
    await CurrentDashboardStore.update(serialized);
  };


  CurrentDashboardStore.subscribe((store) => {
    if (store.widgets == null) return;
    
    // Processing
    const widgets = store.widgets
      .filter((widget) => widget.enabled == true).map((widget) => {
        // Generating GridItem for this widget
        return {
          [COLS]: GridHelp.item({ 
            x: widget.x,
            y: widget.y,
            w: widget.width,
            h: widget.height,
            customDragger: true,
          }),
          id: makeid(4),
          type: widget.type,
        };
      });

    // Checking if we need to adjust this widgets or no.
    if (store.widgets.filter((widget) => widget.enabled && widget.x == 0 && widget.y == 0).length == store.widgets.length) {
      // Adjusting
      gridItems = GridHelp.adjust(widgets, COLS);

      // Synchronizing
      syncWidgets();
    } else {
      gridItems = widgets;
    };

    // Updating loading state
    loading = false;
  });
</script>

<section class="w-full h-full relative mb-8">
  { #if loading || $CurrentDashboardStore.updating }
    <div transition:fade class="w-full h-full flex justify-center items-center">
      <RadialSpinner color="#000" size={15} />
    </div>
  { :else }
    { #if gridItems.length > 0 }
      <!-- Tiles -->
      <Grid on:pointerup={syncWidgets} bind:items={gridItems} rowHeight={100} let:item let:dataItem cols={[[,6]]} fillSpace={true} let:movePointerDown>
        <div class="w-full h-full bg-gray-100 rounded-sm relative">
          <!-- Players widget -->
          { #if dataItem.type == 'PLAYERS' }
            <PlayersTile on:pointerdown={movePointerDown} />
          <!-- Controls widget -->
          { :else if dataItem.type == 'CONTROLS' }
            <ControlsTile on:pointerdown={movePointerDown} /> 
          <!-- Console widget -->
          { :else if dataItem.type == 'CONSOLE' }
            <ConsoleTile on:pointerdown={movePointerDown} />

          <!-- CodeEditor widget -->
          { :else if dataItem.type == 'CODE_EDITOR' }
            <CodeEditorTile on:pointerdown={movePointerDown} />
          { /if }
        </div>
      </Grid>
    { :else }
      <div class="w-full h-full flex justify-center items-center">
        <div class="w-1/3 p-4 bg-gray-100 rounded-sm text-center">
          <!-- Header -->
          <h1 class="text-xl text-black front-medium">Пусто</h1>

          <!-- Text -->
          <p class="text-sm text-black opacity-80 mt-1.5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nobis at nulla sed harum quaerat!</p>

          <!-- Button -->
          <button on:click={() => {
            goto(`/app/${$page.params.projectId}/settings/tiles`);
          }} class="w-full bg-black mt-6 py-2 px-4 flex items-center justify-start">
            <SimpleIcon name="external-link" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />

            <p class="text-sm text-white ml-1.5">Открыть настройки виджетов</p>
          </button>
        </div>
      </div>
    { /if }
  { /if }
</section>