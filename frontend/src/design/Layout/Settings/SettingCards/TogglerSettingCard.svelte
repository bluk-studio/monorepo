<script lang="ts">
  // Importing modules
  import type { TogglerSettingCard } from 'src/config/project';
  import { ESettingCardType } from "$config/project";
  import { SimpleIcon } from 'src/design/Icon';
  import RadialSpinner from "src/design/Loaders/RadialSpinner.svelte";
  import { onMount } from "svelte";

  // Variables
  let toggled: boolean;
  
  // Function, that'll toggle this
  // toggler on or off
  async function toggle() {
    const enabled = toggled;
    toggled = null;

    toggled = await card.updater({ type: ESettingCardType.TOGGLER, enabled }) as boolean;
  };

  // onMount event
  onMount(async () => {
    // Getting current state of this setting card
    toggled = (await card.getter()) as boolean;
  });

  export let card: TogglerSettingCard;
</script>

<div class="w-{ card.size ?? '1/3' } relative p-2">
  <div class="bg-gray-100 p-4 w-full h-full">
    <!-- Header && Toggle -->
    <div class="w-full flex items-center justify-between">
      <!-- Title -->
      <div class="flex items-center">
        <!-- Icon -->
        <div style="background: { card.color }" class="p-2 rounded-full flex items-center justify-center">
          <SimpleIcon name="{ card.icon }" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </div>

        <!-- Text -->
        <div class="ml-2 flex items-center">
          <p class="text-md text-black font-medium">{ card.title }</p>

          <!-- Documentation Link -->
          { #if card.documentationLink }
            <button>
              <SimpleIcon name="external-link" attrs={{ class: "ml-1.5 w-3 h-3 text-black", "stroke-width": "2.5" }} />
            </button>
          { /if }
        </div>
      </div>

      <!-- Toggle -->
      { #if toggled == null }
        <!-- Loading -->
        <RadialSpinner color="#000" size={16} />
      { :else }
        { #if toggled }
          <!-- Toggle on button -->
          <button on:click={toggle} class="rounded-full p-0.5 bg-indigo-500 w-10 flex justify-end">
            <div class="w-4 h-4 rounded-full bg-white shadow-sm"></div>
          </button>
        { :else }
          <!-- Toggled off button -->
          <button on:click={toggle} class="rounded-full p-0.5 bg-gray-300 w-10">
            <div class="w-4 h-4 rounded-full bg-white shadow-sm"></div>
          </button>
        { /if }
      { /if }
    </div>

    <!-- Description -->
    <div class="my-2">
      <p class="text-sm text-black opacity-80">{ card.description }</p>
    </div>
  </div>
</div>