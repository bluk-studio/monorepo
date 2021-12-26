<script lang="ts">
  // Importing modules
  import { ConsoleTile, PlayersTile, ControlsTile } from './Widgets';
  import { SimpleIcon } from 'src/design';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import Grid from "svelte-grid";
  import GridHelp from "svelte-grid/build/helper/index.mjs";
  import RadialSpinner from 'src/design/Loaders/RadialSpinner.svelte';
  import type { EDashboardType, IDashboardWidget } from '@app/shared';

  // Importing possible Dashboard stores
  // +todo dynamic import?
  import { EditorDashboardStore, EditorStore } from 'src/modules/Editor';
  import { ProjectDashboard, CurrentProject } from 'src/stores';
import { onMount } from 'svelte';

  // Variables
  let loading = true;
  let gridItems = [];

  // Exporting variables
  export let type: EDashboardType;
  const store = () => {
    switch (type) {
      case 'CODE_EDITOR' as EDashboardType || 'VISUAL_EDITOR' as EDashboardType:
        return EditorDashboardStore;
    
      case 'PROJECT' as EDashboardType:
        return ProjectDashboard;

      default:
        break;
    }
  };

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
    await store().update(serialized);
  };

  // Determining to which store we need
  // to subscribe (either CurrentProject or EditorStore)
  const unsubscribe = (type == 'PROJECT' as EDashboardType ? CurrentProject :EditorStore).subscribe(async (editor) => {
    // Fetching Dashboard information
    await store().fetch();

    const fetchedWidgets: IDashboardWidget[] = await new Promise((resolve) => {
      store().subscribe((store) => {
        if (store.dashboardId && store.widgets) {
          resolve(store.widgets);
        };
      });
    });

    const widgets = fetchedWidgets.filter((widget) => widget.enabled).map((widget) => {
      return {
        [COLS]: GridHelp.item({ x: widget.x, y: widget.y, w: widget.width, h: widget.height }),
        id: makeid(4),
        type: widget.type,
      };
    });

    if (fetchedWidgets.filter((widget) => widget.x == 0 && widget.y == 0).length == fetchedWidgets.length) {
      gridItems = GridHelp.adjust(widgets, COLS);

      syncWidgets();
    } else {
      gridItems = widgets;
    };

    loading = false;

    // Unsubscribing
    unsubscribe();
  });
</script>

<section class="w-full h-full relative mb-8">
  { #if loading }
    <div class="w-full h-full flex justify-center items-center">
      <RadialSpinner color="#000" size={15} />
    </div>
  { :else }
    { #if gridItems.length > 0 }
      <!-- Tiles -->
      <Grid on:pointerup={syncWidgets} bind:items={gridItems} rowHeight={100} let:item let:dataItem cols={[[,6]]} fillSpace={true}>
        <div class="w-full h-full bg-gray-200 rounded-sm">
          <!-- Players widget -->
          { #if dataItem.type == 'PLAYERS' }
            <PlayersTile />
          <!-- Controls widget -->
          { :else if dataItem.type == 'CONTROLS' }
            <ControlsTile />
          <!-- Console widget -->
          { :else if dataItem.type == 'CONSOLE' }
            <ConsoleTile />
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