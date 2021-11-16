<script lang="ts">
  // Importing modules
  import { goto } from '$app/navigation';
  import { CreateProjectStore } from 'src/stores';
  import { NamedProjectProperties } from 'src/config/project';

  import { SimpleIcon } from 'src/design';

  // Variables
  let name = $CreateProjectStore.name;
  let description = $CreateProjectStore.description;

  let nameProperty = NamedProjectProperties.find((x) => x.id == 'name');
  let descriptionProperty = NamedProjectProperties.find((x) => x.id == 'description');

  function next() {
    // Next - finish page
    goto('/app/create/finish');
  };
</script>

<!-- Information Page Layout -->
<div class="px-4">
  <!-- Name Property -->
  <div class="w-full">
    <!-- Name -->
    <div class="flex items-start mb-4">
      <!-- Icon -->
      <div class="p-2 rounded-full bg-yellow-400">
        <SimpleIcon name={ nameProperty?.icon } attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
      </div>

      <!-- Name + Description -->
      <div class="ml-2">
        <h1 class="text-md text-black">{ nameProperty?.title }</h1>
        <p class="text-xs text-black opacity-80">{ nameProperty?.description }</p>
      </div>
    </div>

    <!-- Value -->
    <div class="w-full relative bg-gray-200 rounded-sm px-2 py-2">
      <input on:change={() => CreateProjectStore.setName(name)} class="bg-gray-200" placeholder="Название" type="text" bind:value={name}>
    </div>
  </div>

  <!-- Description property -->
  <div class="w-full mt-6">
    <!-- Name -->
    <div class="flex items-start mb-4">
      <!-- Icon -->
      <div class="p-2 rounded-full bg-indigo-400">
        <SimpleIcon name={ descriptionProperty?.icon } attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
      </div>

      <!-- Name + Description -->
      <div class="ml-2">
        <h1 class="text-md text-black">{ descriptionProperty?.title }</h1>
        <p class="text-xs text-black opacity-80">{ descriptionProperty?.description }</p>
      </div>
    </div>

    <!-- Value -->
    <div class="w-full relative bg-gray-200 rounded-sm px-2 py-2">
      <textarea on:change={() => CreateProjectStore.setDescription(description)} class="bg-gray-200 w-full" placeholder="Описание сервера" rows="3" bind:value={description}></textarea>
    </div>
  </div>

  <!-- Buttons -->
  <div class="w-full mt-8 flex items-start justify-center">
    <!-- Previous -->
    <button on:click={() => goto('/app/create/plan')} class="w-1/2 mr-2 px-2 py-1 border-2 border-black flex items-center justify-center">
      <SimpleIcon name="chevron-left" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />

      <p class="text-black text-sm ml-2">Вернуться</p>
    </button>

    <!-- Next -->
    <div class="w-1/2 mr-2 relative">
      <button on:click={() => {
        if (name) next();
      }} class="{ !name ? 'cursor-not-allowed opacity-80' : '' } w-full px-2 py-1.5 bg-black rounded-sm flex items-center justify-center">
        <p class="text-white text-sm mr-2">Продолжить</p>

        <SimpleIcon name="chevron-right" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
      </button>
    
      <!-- Button Description -->
      { #if !name }
        <p class="text-xs text-black opacity-80 mt-0.5">Заполните <span class="border-b-2 border-black border-opacity-80">Название</span> сервера</p>
      { /if }
    </div>
  </div>
</div>