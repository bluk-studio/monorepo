<script lang="ts">
  // Importing modules
  import type { InputSettingCard  } from 'src/config';
  import { ESettingCardType} from "$config/project";
  import { SimpleIcon } from 'src/design/Icon';
  import { onMount } from "svelte";
import { RadialSpinner } from 'src/design/Loaders';

  let value: string;
  let synchronizing: boolean = false;

  // Function synchronize
  // to update database value with local value
  async function synchronize() {
    synchronizing = true;

    await card.updater({ type: ESettingCardType.INPUT, value });
    
    synchronizing = false;
  };

  onMount(async () => {
    // Fetching value
    value = await card.getter() as string;
  });

  export let card: Partial<InputSettingCard> = {};
</script>

<!-- Input settings card -->
<div class="w-{ card.size ?? '1/3' } relative p-2">
  <div class="bg-gray-100 p-4 w-full h-full">
    <!-- Header -->
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center">
        <!-- Icon -->
        <div style="background: { card.color }" class="p-2 rounded-full flex items-center justify-center">
          <SimpleIcon name="{ card.icon }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </div>
  
        <!-- Text -->
        <div class="ml-2 flex items-center">
          <p class="text-md text-black font-medium">{ card.title }</p>
  
          { #if card.documentationLink }
            <button>
              <SimpleIcon name="external-link" attrs={{ class: "ml-1.5 w-3 h-3 text-black", "stroke-width": "2.5" }} />
            </button>
          { /if }
        </div>
      </div>

      <!-- Loading spinner -->
      { #if synchronizing }
        <RadialSpinner color="#000" size={16} />
      { /if }
    </div>

    <!-- Description -->
    <div class="my-2">
      <p class="text-sm text-black opacity-80">{ card.description }</p>
    </div>

    <!-- Input -->
    <div class="w-full mt-4 bg-gray-200 rounded-md flex items-center relative">
      <!-- Left placeholder -->
      { #if card.placeholder != null && card.placeholder.side == 'left' }
        <!-- Placeholder -->
        <div class="w-1/3 bg-gray-300 text-center py-1 rounded-l-md">
          <p class="text-sm text-black opacity-80">{ card.placeholder.text }</p>
        </div>
      { /if }

      <!-- Input itself -->
      <input type="text" bind:value on:change={() => synchronize()} class="w-2/3 bg-gray-200 text-sm text-black px-2" placeholder="{ card.textPlaceholder ?? 'Значение' }">

      <!-- Right placeholder -->
      { #if card.placeholder != null && card.placeholder.side == 'right' }
        <!-- Placeholder -->
        <div class="w-1/3 bg-gray-300 text-center py-1 rounded-r-md">
          <p class="text-sm text-black opacity-80">{ card.placeholder.text }</p>
        </div>
      { /if }
    </div>

    <!-- Input PS -->
    { #if card.footerText }
      <p class="mt-1.5 text-xs text-black opacity-80">{@html card.footerText }</p>
    { /if }
  </div>
</div>