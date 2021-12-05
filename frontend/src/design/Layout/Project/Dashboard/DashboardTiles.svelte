<script lang="ts">
  // Importing modules
  import { CurrentProject, ProjectDashboard } from 'src/stores';
  import { ConsoleTile, PlayersTile, ControlsTile } from './Tiles';

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
  const unsubscribe = CurrentProject.subscribe(async ({ project }) => {
    if (project._id) {
      // Updating
      await ProjectDashboard.fetch(String($CurrentProject.project._id));

      const widgets = $ProjectDashboard.widgets.map((widget) => {
        return {
          [COLS]: GridHelp.item({ x: widget.x, y: widget.y, w: widget.width, h: widget.height }),
          id: makeid(4),
          type: widget.type,
        };
      });

      // Adjusting (only if every tile's x and y position are zeros)
      if ($ProjectDashboard.widgets.filter((widget) => widget.x == 0 && widget.y == 0).length == $ProjectDashboard.widgets.length) {
        // Adjusting
        gridItems = GridHelp.adjust(widgets, COLS);

        // Updating
        syncWidgets();
      } else {
        // Everything is pre-adjusted
        gridItems = widgets;
      };

      // Unsubscribing
      unsubscribe();
    };
  });

  let gridItems = [];
</script>

<section class="w-full relative mb-8">
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
</section>