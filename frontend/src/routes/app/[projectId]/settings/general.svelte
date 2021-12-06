<script lang="ts">
  // Importing modules
  import { SimpleIcon, UniversalSettingCard } from 'src/design';
  import { GeneralSettings } from 'src/config';
</script>

<!-- Content -->
<section class="w-full flex flex-wrap items-stretch">
  { #each GeneralSettings as setting }
    <UniversalSettingCard card={setting} />
  { /each }

  <!-- Enabled toggle button card -->
  <div class="w-1/3 relative p-2">
    <div class="bg-gray-100 p-4 w-full h-full">
      <!-- Header && Toggle -->
      <div class="w-full flex items-center justify-between">
        <!-- Title -->
        <div class="flex items-center">
          <!-- Icon -->
          <div class="p-2 bg-blue-500 rounded-full flex items-center justify-center">
            <SimpleIcon name="shield" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
          </div>

          <!-- Text -->
          <div class="ml-2 flex items-center">
            <p class="text-md text-black font-medium">Вайтлист</p>

            <button>
              <SimpleIcon name="external-link" attrs={{ class: "ml-1.5 w-3 h-3 text-black", "stroke-width": "2.5" }} />
            </button>
          </div>
        </div>

        <!-- Toggle -->
        <div>
          <button class="rounded-full p-0.5 bg-indigo-500 w-10 flex justify-end">
            <div class="w-4 h-4 rounded-full bg-white shadow-sm"></div>
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="my-2">
        <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.</p>
      </div>
    </div>
  </div>

  <!-- Other toggler settings card -->
  <div class="w-1/3 relative p-2">
    <div class="bg-gray-100 p-4 w-full h-full">
      <!-- Header && Toggle -->
      <div class="w-full flex items-center justify-between">
        <!-- Title -->
        <div class="flex items-center">
          <!-- Icon -->
          <div class="p-2 bg-pink-500 rounded-full flex items-center justify-center">
            <SimpleIcon name="clock" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
          </div>

          <!-- Text -->
          <div class="ml-2 flex items-center">
            <p class="text-md text-black font-medium">Режим 24/7</p>

            <button>
              <SimpleIcon name="external-link" attrs={{ class: "ml-1.5 w-3 h-3 text-black", "stroke-width": "2.5" }} />
            </button>
          </div>
        </div>

        <!-- Toggle -->
        <div>
          <button class="rounded-full p-0.5 bg-indigo-500 w-10 flex justify-end">
            <div class="w-4 h-4 rounded-full bg-white shadow-sm"></div>
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="my-2">
        <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.</p>
      </div>
    </div>
  </div>

  <!-- Input settings card -->
  <div class="w-1/3 relative p-2">
    <div class="bg-gray-100 p-4 w-full h-full">
      <!-- Header -->
      <div class="w-full flex items-center">
        <!-- Icon -->
        <div class="p-2 bg-green-500 rounded-full flex items-center justify-center">
          <SimpleIcon name="globe" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </div>

        <!-- Text -->
        <div class="ml-2 flex items-center">
          <p class="text-md text-black font-medium">Публичный адресс</p>

          <button>
            <SimpleIcon name="external-link" attrs={{ class: "ml-1.5 w-3 h-3 text-black", "stroke-width": "2.5" }} />
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="my-2">
        <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.</p>
      </div>

      <!-- Input -->
      <div class="w-full mt-4 bg-gray-200 rounded-md flex items-center relative">
        <!-- Input itself -->
        <input type="text" class="w-2/3 bg-gray-200 text-sm text-black px-2" placeholder="Публичный адресс">

        <!-- Placeholder -->
        <div class="w-1/3 bg-gray-300 text-center py-1 rounded-r-md">
          <p class="text-sm text-black opacity-80">.bluk.studio</p>
        </div>
      </div>

      <!-- Input PS -->
      <p class="mt-1.5 text-xs text-black opacity-80">Принимаются только <span class="bg-gray-300 rounded-full px-1.5 py-0.5">Английские буквы</span> максимум <span class="bg-gray-300 rounded-full px-1.5 py-0.5">20 букв</span></p>
    </div>
  </div>
</section>