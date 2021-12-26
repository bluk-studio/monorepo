<script lang="ts">
  // Importing modules
  import { EditorStore } from 'src/modules/Editor';
  import { WidgetsContainer, SimpleIcon } from 'src/design';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  import { CurrentProject, ProfileProjects } from 'src/stores';
  
  // Importing tiles
  import { ProjectTile, PluginTile, NodeTile } from 'src/design';

  enum CategoryType {
    PROJECTS = 'PROJECTS',
    PLUGINS = 'PLUGINS',
    NODES = 'NODES',
  };

  // Variables
  const categories: {
    type: CategoryType,
  
    // Visual
    icon: string,
    title: string,

    // Technical
    tileComponent: typeof ProjectTile | typeof PluginTile | typeof NodeTile,
    list: { _id: string }[],

    show: boolean,
  }[] = [
    // Projects Category
    {
      type: CategoryType.PROJECTS,

      icon: 'archive',
      title: 'Проекты',

      tileComponent: ProjectTile,
      list: [],

      show: true,
    },

    // Plugins Category
    {
      type: CategoryType.PLUGINS,

      icon: 'code',
      title: 'Плагины',

      tileComponent: PluginTile,
      list: [],

      show: false,
    }

    // Nodes Category
  ];

  // chooseResource function
  function chooseResource(type: CategoryType, resource: { _id: string }) {
    switch (type) {
      // Project resource
      case CategoryType.PROJECTS:
        // Choosing current project
        CurrentProject.fetch(resource._id);

        break;
    
      // Plugin/Node resource
      case CategoryType.PLUGINS || CategoryType.NODES:
        break;

      default:
        break;
    };
  };

  // onMount event
  onMount(() => {
    // Fetching all projects.
    ProfileProjects.subscribe((object) => {
      if (object.loaded) {
        // Updating Projects category
        categories[categories.findIndex((x) => x.type == CategoryType.PROJECTS)] = {
          ...categories.find((x) => x.type == CategoryType.PROJECTS),
          list: object.list,
        };
      };
    });

    // Fetching all plugins

    // Fetching all nodes
  });
</script>

{ #if $EditorStore.resourceType && $EditorStore.resourceId }
  <div class="w-full h-full relative">
    <WidgetsContainer type={$EditorStore.resourceType} />
  </div>
{ :else }
  <!-- Selector -->
  <div class="w-full h-full flex items-center justify-center bg-gradient-to-tr from-gray-900 to-black">
    <div class="w-2/3 h-2/3 bg-white rounded-md overflow-hidden overflow-y-auto">
      <!-- Current Project (if set) -->
      { #if $CurrentProject.loaded && $CurrentProject?.project?._id != null }
        <div class="w-full flex items-center justify-between py-2 px-2 bg-gray-200">
          <!-- Project information -->
          <div class="flex items-center justify-center">
            <!-- Icon -->
            <div class="w-9 h-9 rounded-md bg-red-500"></div>

            <!-- Text -->
            <div class="mx-2">
              <!-- Title -->
              <div class="flex items-center">
                <h1 class="text-xl text-black font-medium">{ $CurrentProject.project.name }</h1>
              
                <!-- Choosed Badge -->
                <button on:click={() => {
                  CurrentProject.clear();
                }} class="bg-black px-1 py-0.5 ml-2 rounded-md flex items-center justify-center">
                  <SimpleIcon name="check" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "2.5" }} />
    
                  <p class="text-xs text-white ml-1">Выбранно</p>
                </button>
              </div>

              <!-- Description -->
              <p class="text-xs text-black opacity-80">{ $CurrentProject.project.description ?? 'Описание отсутствует...' }</p>
            </div>
          </div>

          <!-- Controls -->
          <button on:click={() => {
            CurrentProject.clear();
          }} class="px-2 py-1 bg-black flex items-center justify-center">
            <SimpleIcon name="x" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />

            <p class="text-sm text-white ml-1.5">Отменить выбор</p>
          </button>
        </div>
      { :else }
        <!-- Header -->
        <div class="p-2">
          <h1 class="text-xl text-black font-medium">Выберите ресурс</h1>
          <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quasi?</p>
        </div>
      { /if }

      <!-- Results -->
      <div>
        { #each categories.filter((category) => {
          if ($CurrentProject.loaded && $CurrentProject?.project?._id != null) {
            return category.type != CategoryType.PROJECTS;
          } else {
            return true;
          };
        }) as category }
          <div class="mt-4">
            <!-- Header -->
            <div class="w-full px-2">
              <div on:click={() => {
                category.show = !category.show
              }} class="w-full cursor-pointer flex items-center justify-between border-b-2 border-black pb-1.5">
                <div class="flex items-center">
                  <SimpleIcon name="{ category.icon }" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        
                  <p class="ml-1.5 text-base text-black">{ category.title }</p>
                </div>
      
                <SimpleIcon name="{ category.show ? 'chevron-up' : 'chevron-down' }" attrs={{ class: "ml-1 w-4 h-4 text-black", "stroke-width": "2.5" }} />
              </div>
            </div>

            <!-- List -->
            { #if category.show }
              <div transition:slide class="mt-2 flex items-stretch flex-wrap">
                { #if category.list.length > 0 }
                  <!-- Tiles -->
                  { #each category.list as resource }
                    <div on:click={() => {
                      chooseResource(category.type, resource);
                    }} class="w-1/3 p-2 relative cursor-pointer">
                      <div class="w-full h-auto bg-gray-100 rounded-md">
                        <svelte:component this={category.tileComponent} input={resource} />
                      </div>
                    </div>
                  { /each }
                { :else }
                  <!-- Empty category notice -->
                { /if }
              </div>
            { /if }
          </div>
        { /each }
      </div>
    </div>
  </div>
{ /if }