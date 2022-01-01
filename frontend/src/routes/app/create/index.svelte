<script lang="ts">
import { goto } from '$app/navigation';

  // Importing modules
  import { SimpleIcon } from 'src/design';
</script>

<!-- Layout -->
<div class="w-full h-full flex flex-col items-center py-12 justify-center bg-gradient-to-tr from-gray-900 to-black">
  <div class="w-1/3 relative overflow-y-auto overflow-x-hidden">
    <div class="w-full bg-white rounded-sm py-6 flex flex-col items-center justify-center">
      <!-- Header -->
      <div class="w-full ml-3 text-left px-6 relative">
        <h1 class="text-xl text-black font-medium">Что хотите создать?</h1>
        <p class="text-xs text-black opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur asperiores veritatis delectus sequi! Ab, sed.</p>
      </div>

      <!-- Variants -->
      <div class="w-full my-6">
        <!-- Project -->
        <div class="w-full border-2 border-gray-200 flex items-start rounded-sm px-6 py-4">
          <!-- Icon -->
          <div class="p-3 bg-yellow-400 rounded-full flex items-center justify-center">
            <SimpleIcon name="archive" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
          </div>
      
          <!-- Information -->
          <div class="ml-4">
            <!-- Title and price -->
            <div class="flex items-center mb-1.5">
              <h1 class="text-md text-black font-medium">Проект</h1>
            </div>
      
            <!-- Description -->
            <p class="text-xs text-black opacity-80 mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dicta vel distinctio nisi quia voluptates unde quos laudantium tempora cum, harum accusantium. Fugiat, blanditiis facere.</p>
          
            <!-- Actions -->
            <div class="flex items-stretch">
              <!-- Choose -->
              <button on:click={() => {
                goto('/app/create/project');
              }} class="px-2 py-1 border-2 border-black rounded-sm flex items-center mr-3">
                <p class="text-black text-xs mr-1.5">Выбрать</p>
    
                <SimpleIcon name="chevron-right" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "2.5" }} />
              </button>
      
              <!-- More Information -->
              <button class="px-2 py-1 border-2 border-black">
                <p class="text-black text-xs">Узнать больше</p>
              </button>
            </div>
          </div>
        </div>

        <!-- Plugin -->
        <div class="w-full border-b-2 border-gray-200 flex items-start rounded-sm px-6 py-4">
          <!-- Icon -->
          <div class="p-3 bg-indigo-400 rounded-full flex items-center justify-center">
            <SimpleIcon name="code" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
          </div>
      
          <!-- Information -->
          <div class="ml-4">
            <!-- Title and price -->
            <div class="flex items-center mb-1.5">
              <h1 class="text-md text-black font-medium">Плагин</h1>
            </div>
      
            <!-- Description -->
            <p class="text-xs text-black opacity-80 mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus dicta vel distinctio nisi quia voluptates unde quos laudantium tempora cum, harum accusantium. Fugiat, blanditiis facere.</p>
          
            <!-- Actions -->
            <div class="flex items-stretch">
              <!-- Choose -->
              <button on:click={() => {
                goto('/app/create/plugin');
              }} class="px-2 py-1 border-2 border-black rounded-sm flex items-center mr-3">
                <p class="text-black text-xs mr-1.5">Выбрать</p>
    
                <SimpleIcon name="chevron-right" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "2.5" }} />
              </button>
      
              <!-- More Information -->
              <button class="px-2 py-1 border-2 border-black">
                <p class="text-black text-xs">Узнать больше</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>