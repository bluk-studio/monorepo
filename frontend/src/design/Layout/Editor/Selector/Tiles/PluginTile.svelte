<script lang="ts">
  // Importing modules
  import type { IRawPlugin } from "@app/shared";

  export let input: Partial<IRawPlugin>;
</script>

<!-- Tile information -->
<div class="p-2">
  <!-- Header -->
  <div class="w-full flex items-center justify-between">
    <!-- Status badges -->
    <div class="flex items-center">
      <!-- Plugin Type -->
      <div class="px-3 py-1 rounded-full bg-gray-200 flex items-center justify-center">
        <p class="text-xs text-black opacity-80">TypeScript</p>
      </div>
    </div>
  </div>

  <!-- Information -->
  <div class="mt-2">
    <!-- Title -->
    <h1 class="text-md text-black font-medium">{ input.title }</h1>

    <!-- Description -->
    <p class="text-xs text-black opacity-80">{ input.description ?? 'Описание отсутствует...' }</p>
  </div>
</div>