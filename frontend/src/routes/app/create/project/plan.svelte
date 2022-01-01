<script lang="ts">
  // Importing modules
  import { SimpleIcon } from 'src/design';
  import { goto } from '$app/navigation';

  import { CreateProjectStore } from 'src/stores';
  import { ProjectPlans } from 'src/config/project';

  // Function, that'll proceed to next stage
  function next(planId: string) {
    // Updating our CreateProject store information
    CreateProjectStore.setPlan(planId);

    // Next - information stage
    goto('/app/create/project/information');
  };
</script>

<!-- Plans -->
{ #each ProjectPlans as plan }
  <div class="w-full border-2 { $CreateProjectStore.plan == plan.id ? 'border-yellow-400' : 'border-gray-200' } flex items-start rounded-sm px-6 py-4">
    <!-- Icon -->
    <div style="background: { plan.color }" class="p-3 rounded-full flex items-center justify-center">
      <SimpleIcon name="{ plan.icon }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
    </div>

    <!-- Information -->
    <div class="ml-4">
      <!-- Title and price -->
      <div class="flex items-center mb-1.5">
        <h1 class="text-md text-black font-medium">{ plan.title }</h1>

        <!-- +todo -->
        { #if plan.price == 0 }
          <div class="ml-2 rounded-full bg-black px-2 py-1">
            <p class="text-xs text-white">Бесплатно</p>
          </div>
        { /if }
      </div>

      <!-- Description -->
      <p class="text-xs text-black opacity-80 mb-4">{ @html plan.description }</p>
    
      <!-- Actions -->
      <div class="flex items-stretch">
        <!-- Choose -->
        { #if $CreateProjectStore.plan == plan.id }
          <button class="px-2 py-1 bg-black rounded-sm flex items-center mr-3">
            <SimpleIcon name="check" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "2.5" }} />

            <p class="text-white text-xs ml-1.5">Выбранно</p>
          </button>
        { :else }
          <button on:click={() => next(plan.id)} class="px-2 py-1 border-2 border-black rounded-sm flex items-center mr-3">
            <p class="text-black text-xs mr-1.5">Выбрать</p>

            <SimpleIcon name="chevron-right" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "2.5" }} />
          </button>
        { /if }

        <!-- More Information -->
        <button class="px-2 py-1 border-2 border-black">
          <p class="text-black text-xs">Узнать больше</p>
        </button>
      </div>
    </div>
  </div>
{ /each }

<!-- Info -->
<div class="w-full border-2 flex items-start border-gray-200 rounded-sm px-6 py-4">
  <!-- Icon -->
  <div class="p-3 rounded-full bg-indigo-400 flex items-center justify-center">
    <SimpleIcon name="heart" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
  </div>

  <!-- Information -->
  <div class="ml-4">
    <!-- Title and price -->
    <div class="flex items-center mb-1.5">
      <h1 class="text-md text-black font-medium">Больше планов нет</h1>
    </div>

    <!-- Description -->
    <p class="text-xs text-black opacity-80 mb-4">Да-да, вы всё правильно поняли! Сервис полностью бесплатен и почти что неограничен.</p>
  
    <!-- Actions -->
    <div class="flex items-stretch">
      <!-- More Information -->
      <button class="px-2 py-1 border-2 border-black">
        <p class="text-black text-xs">Поддержать проект</p>
      </button>
    </div>
  </div>
</div>
