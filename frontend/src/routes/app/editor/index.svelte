<script lang="ts">
  // Importing modules
  import { EditorStore } from 'src/modules/Editor';
  import { WidgetsContainer, SimpleIcon } from 'src/design';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import type { IProject, IRawPlugin, EResourceType } from '@app/shared';

  import { CurrentProject, ProfileProjects } from 'src/stores';
  import { CurrentRawPluginStore, RawPluginsStore } from 'src/modules/Plugins';
  
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
    list: Partial<IProject>[] | Partial<IRawPlugin>[],

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

      show: true,
    }

    // Nodes Category
  ];

  // chooseResource function
  function chooseResource(type: CategoryType, untypedResource: Partial<IProject> | Partial<IRawPlugin>) {
    switch (type) {
      // Project resource
      case CategoryType.PROJECTS:
        const project: Partial<IProject> = untypedResource as Partial<IProject>;

        // Choosing current project
        CurrentProject.fetch(String(project._id));

        break;
    
      // Plugin resource
      case CategoryType.PLUGINS:
        const plugin: Partial<IRawPlugin> = untypedResource as Partial<IRawPlugin>;

        // Determining Plugin type
        let type: EResourceType;
        
        if (plugin.__typename == 'RawPlugin') {
          type = 'RAW_PLUGIN' as EResourceType; 
        };

        // Choosing this plugin
        window.location.href = `/app/editor?resourceType=${type}&resourceId=${plugin._id}`;

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
    RawPluginsStore.subscribe((object) => {
      if (object.list) {
        categories[categories.findIndex((x) => x.type == CategoryType.PLUGINS)] = {
          ...categories.find((x) => x.type == CategoryType.PLUGINS),
          list: object.list,
        };
      };
    });

    // Subscribing to CurrentProject store to
    // update RawPluginsStore
    CurrentProject.subscribe((object) => {
      // Clearing store
      RawPluginsStore.clear();
      
      // Updating RawPlugins store
      if (object.project?._id == null) {
        // Fetching all profile project (do not include other project plugins)
        RawPluginsStore.refetch('PROFILE', false);
      } else {
        // Fetch only project-related plugins
        RawPluginsStore.refetch('PROJECT');
      };
    });

    // Fetching all nodes
    // +todo

    // Checking if our query parameters are right
    // if ($page.query.get('resourceType') != $EditorStore.resourceType) $page.query.set('resourceType', String($EditorStore.resourceType));
    // if ($page.query.get('resourceId') != $EditorStore.resourceId) $page.query.set('resourceId', String($EditorStore.resourceId));

    // goto(`/app/editor?${$page.query.toString()}`, { replaceState: true });
  });
</script>

{ #if ($EditorStore.resourceType && $EditorStore.resourceId) && ($page.query.get('resourceType') && $page.query.get('resourceId')) }
  <div class="w-full h-full relative">
    <WidgetsContainer />
  </div>
{ :else }
  <!-- Selector -->
  <div class="w-full h-full flex items-center justify-center bg-gradient-to-tr from-gray-900 to-black">
    <div class="w-5/6 h-5/6 bg-white rounded-md overflow-hidden overflow-y-auto">
      <!-- Current Resource (if set) -->
      { #if $EditorStore.resourceType && $EditorStore.resourceId }
        <div class="w-full flex items-center justify-between py-2 px-2 bg-gray-200">
          <!-- Project information -->
          <div class="flex items-center justify-center">
            <!-- Icon -->
            <div class="w-9 h-9 rounded-md bg-red-500"></div>

            <!-- Text -->
            <div class="mx-2">
              <!-- Title -->
              <div class="flex items-center">
                <h1 class="text-xl text-black font-medium">{ $EditorStore.resourceType == 'RAW_PLUGIN' ? $CurrentRawPluginStore.title : 'Неизвестно' }</h1>
              
                <!-- Choosed Badge -->
                <button on:click={() => {
                  CurrentProject.clear();
                }} class="bg-black px-1 py-0.5 ml-2 rounded-md flex items-center justify-center">
                  <SimpleIcon name="check" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "2.5" }} />
    
                  <p class="text-xs text-white ml-1">Выбранный ресурс</p>
                </button>
              </div>

              <!-- Description -->
              <p class="text-xs text-black opacity-80">{ $EditorStore.resourceType == 'RAW_PLUGIN' ? $CurrentRawPluginStore.description : 'Неизвестно...' ?? 'Описание отсутствует...' }</p>
            </div>
          </div>

          <!-- Controls -->
          <button on:click={() => {
            CurrentProject.clear();

            EditorStore.clear();
          }} class="px-2 py-1 bg-black flex items-center justify-center">
            <SimpleIcon name="x" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />

            <p class="text-sm text-white ml-1.5">Отменить выбор</p>
          </button>
        </div>
      { :else }
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
      { /if }

      <!-- Results -->
      <div class="pb-12">
        { #each categories as category }
          { #if !$CurrentProject.loaded || $CurrentProject.loaded && category.type != CategoryType.PROJECTS }
            <div class="mt-4">
              <!-- Header -->
              <div class="w-full px-2">
                <div class="w-full flex items-center justify-between border-b-2 border-black pb-1.5">
                  <div on:click={() => {
                    category.show = !category.show
                  }} class="w-full flex items-center cursor-pointer">
                    <SimpleIcon name="{ category.icon }" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
          
                    <p class="ml-1.5 text-base text-black">{ category.title }</p>

                    { #if !category.show }
                      <div in:fade class="bg-black px-1 py-0.5 ml-2 rounded-md">
                        <p class="text-xs text-white">Скрыто</p>
                      </div>
                    { /if }
                  </div>
        
                  <!-- Create new resource button -->
                  <button class="px-4 py-1.5 flex items-center justify-center border-2 border-black">
                    <SimpleIcon name="plus" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />

                    <p class="text-sm text-black ml-1.5">Создать</p>
                  </button>
                </div>
              </div>

              <!-- List -->
              { #if category.show }
                <div transition:slide class="mt-2 flex items-stretch flex-wrap">
                  { #if category.list.length > 0 }
                    <!-- Tiles -->
                    { #each category.list as untypedResource }
                      <div on:click={() => {
                        chooseResource(category.type, untypedResource);
                      }} class="w-1/3 p-2 relative cursor-pointer">
                        <div class="w-full h-auto bg-gray-100 rounded-md">
                          <svelte:component this={category.tileComponent} input={untypedResource} />
                        </div>
                      </div>
                    { /each }
                  { :else }
                    <!-- Empty category notice -->
                  { /if }
                </div>
              { /if }
            </div>
          { /if }
        { /each }
      </div>
    </div>
  </div>
{ /if }