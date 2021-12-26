<script lang="ts">
  // Importing modules
  import type { IProject } from "@app/shared";

  export let input: Partial<IProject>;
</script>

<!-- Tile information -->
<div class="p-2">
  <!-- Header -->
  <div class="w-full flex items-center justify-between">
    <!-- Icon -->
    <div>
      <div class="w-7 h-7 bg-red-500 rounded-md">

      </div>
    </div>

    <!-- Status badges -->
    <div class="flex items-center">
      <!-- Current status -->
      <div class="mx-1 px-3 py-1 rounded-full bg-gray-200 flex items-center justify-center">
        <div class="w-3 h-3 rounded-full bg-green-500"></div>

        <p class="text-xs text-black ml-2 opacity-80">Работает</p>
      </div>
    </div>
  </div>

  <!-- Information -->
  <div class="mt-2">
    <!-- Title -->
    <h1 class="text-md text-black font-medium">{ input.name }</h1>

    <!-- Description -->
    <p class="text-xs text-black opacity-80">{ input.description ?? 'Описание отсутствует...' }</p>
  </div>
</div>