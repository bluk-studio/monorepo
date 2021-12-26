<script lang="ts">
  // Importing modules
  import { SimpleIcon } from 'src/design/Icon';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
</script>

<!-- Header -->
<div class="w-full border-b-2 border-gray-300 py-2 px-4 flex items-center justify-between">
  <h1 class="text-md text-black font-medium">Игроки</h1>

  <div class="flex items-center">
    <!-- Change view -->
    
    <!-- Settings -->
    <button on:click={() => {
      goto(`/app/${$page.params.projectId}/settings/tiles`)
    }}>
      <SimpleIcon name="settings" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
    </button>
  </div>
</div>

<!-- Player list -->
<div class="mt-4 px-4">
  <!-- Player #1 -->
  <div class="my-3 flex items-center justify-between">
    <!-- Player information -->
    <div class="flex items-center">
      <img src="https://crafatar.com/avatars/1b42ff62-b4cb-4b8e-8fbd-efd24e70ced2" alt="" class="w-8 h-8 rounded-sm">
      
      <div class="ml-2">
        <h1 class="text-base text-black font-medium">SniperFox213</h1>
        
        <!-- Tags -->
        <div class="flex items-stretch">
          <!-- Status -->
          <div class="mr-1 rounded-full px-2 py-0.5 bg-indigo-400">
            <p class="text-xs text-white">Оператор</p>
          </div>

          <!-- Play time -->
          <div class="rounded-full px-2 py-0.5 bg-yellow-400">
            <p class="text-xs text-white">Играет 4 часов</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Player controls -->
    <div class="flex items-center">
      <SimpleIcon name="x-circle" attrs={{ class: "w-5 h-5 text-black mr-2", "stroke-width": "2.5" }} />
      <SimpleIcon name="settings" attrs={{ class: "w-5 h-5 text-black ml-2 ", "stroke-width": "2.5" }} />
    </div>
  </div>

  <!-- Player #2 -->
  <div class="my-3 flex items-center justify-between">
    <!-- Player information -->
    <div class="flex items-center">
      <img src="https://crafatar.com/avatars/1b42ff62-b4cb-4b8e-8fbd-efd24e70ced2" alt="" class="w-8 h-8 rounded-sm">
      
      <div class="ml-2">
        <h1 class="text-base text-black font-medium">Lol</h1>
        
        <!-- Tags -->
        <div class="flex items-stretch">
          <!-- Play time -->
          <div class="rounded-full px-2 py-0.5 bg-yellow-400">
            <p class="text-xs text-white">Играет 6 часов</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Player controls -->
    <div class="flex items-center">
      <SimpleIcon name="x-circle" attrs={{ class: "w-5 h-5 text-black mr-2", "stroke-width": "2.5" }} />
      <SimpleIcon name="settings" attrs={{ class: "w-5 h-5 text-black ml-2 ", "stroke-width": "2.5" }} />
    </div>
  </div>
</div>
