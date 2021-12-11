<script lang="ts">
  // Importing modules
  import { SimpleIcon, PlayersTile, UniversalSettingCard, RadialSpinner, ConsoleTile, ControlsTile, LogsTile } from 'src/design';
  import { CurrentProject, ProjectDashboard } from '$stores/project';
  import { onMount } from 'svelte';
  
  // onMount event
  onMount(() => {
    if ($ProjectDashboard._id == null) {
      // Fetching project dashboard
      ProjectDashboard.fetch(String($CurrentProject?.project?._id));

      // Subscribing to check for updates
      ProjectDashboard.subscribe((dashboard) => {
        if (dashboard._id) {
          loading = false;
        };
      });
    } else {
      loading = false;
    };
  });
  
  // Importing widget settings
  import { ConsoleWidgetSettings, ControlsWidgetSettings, LogsWidgetSettings, PlayersWidgetSettings } from 'src/config';
  import { PlayersWidgetGetters } from '$stores/project/settings';

  // Creating global array of settings
  const settings = [
    // Players widget
    {
      // Visual
      title: "Игроки",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut cum repudiandae aspernatur quasi laudantium.",

      // Technical
      component: PlayersTile,
      settings: PlayersWidgetSettings,
    },

    // Console Widget
    {
      // Visual
      title: "Консоль",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut cum repudiandae aspernatur quasi laudantium.",

      // Technical
      component: ConsoleTile,
      settings: ConsoleWidgetSettings,
    },

    // Controls Widget
    {
      // Visual
      title: "Управление",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut cum repudiandae aspernatur quasi laudantium.",

      // Technical
      component: ControlsTile,
      settings: ControlsWidgetSettings,
    },
    
    // Logs Widget
    {
      // Visual
      title: "Логи",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut cum repudiandae aspernatur quasi laudantium.",

      // Technical
      component: LogsTile,
      settings: LogsWidgetSettings,
    },
  ];

  let loading = true;
</script>

<!-- Content -->

{ #if loading }
  <div class="w-full h-full flex justify-center items-center">
    <RadialSpinner color="#000" size={15} />
  </div>
{ :else }
  { #each settings as widget }
    <!-- Header -->
    <div class="w-2/3 px-2">
      <h1 class="text-2xl text-black font-medium">{ widget.title }</h1>
      <p class="text-sm text-black opacity-80">{ widget.description }</p> 
    </div>

    <!-- Content -->
    <section class="mt-4 w-full flex items-stretch relative">
      <!-- Settings -->
      <div class="w-1/2 flex flex-wrap items-stretch">
        { #each widget.settings as setting }
          <UniversalSettingCard card={setting} />
        { /each }
      </div>

      <!-- Preview -->
      <div class="w-1/2 flex items-center justify-center relative opacity-90">
        <!-- Header -->
        <div class="absolute inset-x-0 top-0 w-full p-2 flex justify-end">
          <div class="bg-gray-100 px-4 py-1.5 flex items-center justify-center">
            <p class="text-sm text-black">Предварительный просмотр</p>

            <button class="ml-2">
              <SimpleIcon name="x" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </button>
          </div>
        </div>

        <!-- Preview itself -->
        <div class="bg-gray-200 rounded-md border-2 border-dotted border-indigo-500">
          <svelte:component this={widget.component} />
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full flex justify-center px-2">
      <div class="my-8 w-full h-2 border-b-2 border-gray-200"></div>
    </div>
  { /each }
{ /if }