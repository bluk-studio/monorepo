<script lang="ts">
  // Importing modules
  import { CreateProjectStore } from 'src/stores';
  import { NamedProjectProperties } from 'src/config/project';
  import { ProjectPlans } from 'src/config/project';

  import { SimpleIcon } from 'src/design';
import { goto } from '$app/navigation';
import { identity } from 'svelte/internal';

  // Variables
  $: plan = ProjectPlans.filter((x) => x.id == $CreateProjectStore.plan)[0];
</script>

<!-- Finish Page Layout -->
<div class="w-full flex flex-wrap px-6 relative items-stretch">
  { #each NamedProjectProperties as property }
    <div class="w-full p-4 bg-gray-100 rounded-sm m-2">
      <div class="flex items-center">
        <!-- Icon -->
        { #if property.icon }
          <SimpleIcon name="{ property.icon }" attrs={{ class: "w-4 h-4 text-black mr-2", "stroke-width": "2.5" }} />
        { /if }

        <!-- Name -->
        <h1 class="text-black text-md font-medium">{ property.title }</h1>

        <!-- Checking if this property is required or no -->
        { #if !$CreateProjectStore[property.id] }
          { #if property.required }
            <div class="ml-2 px-1.5 py-0.5 rounded-full bg-red-500 flex items-center">
              <SimpleIcon name="alert-triangle" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "2" }} />
          
              <p class="text-xs text-white ml-0.5">Обязательно</p>
            </div>
          { :else }
            <div class="ml-2 px-1.5 py-0.5 rounded-full bg-yellow-500 flex items-center">
              <p class="text-xs text-white ml-0.5">Необязательно</p>
            </div>
          { /if }
        { /if }
      </div>  

      <!-- Description -->
      <p class="text-sm text-black opacity-80">{ property.description }</p>

      <!-- Value -->
      <div class="w-full mt-4">
        { #if $CreateProjectStore[property.id] }
          <!-- Plan property -->
          { #if property.id == 'plan' }
            <div class="w-full bg-white border-2 border-yellow-400 flex items-start rounded-sm px-2 py-4">
              <!-- Icon -->
              <div style="background: { plan.color }" class="p-3 rounded-full flex items-center justify-center">
                <SimpleIcon name="{ plan.icon }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
              </div>
          
              <!-- Information -->
              <div class="ml-4">
                <!-- Title and price -->
                <h1 class="text-md text-black font-medium">{ plan.title }</h1>
          
                <!-- Description -->
                <p class="text-xs text-black opacity-80">{ @html plan.description }</p>

                <!-- Actions -->
                <div class="flex items-stretch mt-2">
                  <!-- Plan Price -->
                  <div class="px-2 py-1 bg-black rounded-sm flex items-center mr-3">
                    <!-- +todo -->
                    { #if plan.price == 0 }
                      <p class="text-xs text-white">Бесплатно</p>
                    { /if }
                  </div>

                  <!-- More Information -->
                  <button on:click={() => goto('/app/create/plan')} class="px-2 py-1 border-2 border-black">
                    <p class="text-black text-xs">Выбрать другой</p>
                  </button>
                </div>
              </div>
            </div>
          <!-- Name and Description property -->
          { :else if property.id == 'name' || property.id == 'description' }
            <div class="bg-white px-4 py-2 rounded-sm border-2 border-yellow-400 flex items-start justify-between">
              <h1 class="text-md text-black">{ $CreateProjectStore[property.id] }</h1>

              <!-- Edit button -->
              <button on:click={() => goto('/app/create/information')} class="py-1">
                <SimpleIcon name="edit" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
              </button>
            </div>
          { /if }
        { :else }
          <div class="px-4 py-1.5 rounded-sm { property.required ? 'bg-red-500' : 'bg-yellow-500' }">
            <h1 class="text-white text-sm">Значение не задано</h1>

            { #if property.pageId }
              <p class="text-xs text-white opacity-80">Вы можете задать значение этому пункту плана, нажав на кнопку ниже:</p>

              <button on:click={() => goto(`/app/create/${ property.pageId }`)} class="mt-1 px-2 py-1 rounded-sm bg-black">
                <p class="text-xs text-white">Перейти</p>
              </button>
            { /if }
          </div>
        { /if }
      </div>
    </div>
  { /each }
</div>