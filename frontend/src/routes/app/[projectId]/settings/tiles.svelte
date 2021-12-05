<script lang="ts">
  // Importing modules
  import { SimpleIcon, PlayersTile } from 'src/design';
</script>

<!-- Content -->

<!-- Players tile settings -->
<div class="w-2/3 px-2">
  <h1 class="text-2xl text-black font-medium">Игроки</h1>
  <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut cum repudiandae aspernatur quasi laudantium.</p> 
</div>

<!-- Content -->
<section class="mt-4 w-full flex items-stretch relative">
  <!-- Settings -->
  <div class="w-1/2 flex flex-wrap items-stretch">
    <!-- Toggler -->
    <div class="w-1/2 relative p-2">
      <div class="bg-gray-100 p-4 w-full h-full">
        <!-- Header && Toggle -->
        <div class="w-full flex items-center justify-between">
          <!-- Title -->
          <div class="flex items-center">
            <!-- Icon -->
            <div class="p-2 bg-green-500 rounded-full flex items-center justify-center">
              <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
            </div>
  
            <!-- Text -->
            <p class="ml-2 text-md text-black font-medium">Отображать</p>
          </div>
  
          <!-- Toggle -->
          <div>
            <button class="rounded-full p-0.5 bg-gray-300 w-10">
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
    
    <!-- Another settings card -->
    <div class="w-1/2 relative p-2">
      <div class="bg-gray-100 p-4 w-full h-full">
        <!-- Header && Toggle -->
        <div class="w-full flex items-center justify-between">
          <!-- Title -->
          <div class="flex items-center">
            <!-- Icon -->
            <div class="p-2 bg-green-500 rounded-full flex items-center justify-center">
              <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
            </div>
  
            <!-- Text -->
            <p class="ml-2 text-md text-black font-medium">Отображать</p>
          </div>
  
          <!-- Toggle -->
          <div>
            <button class="rounded-full p-0.5 bg-gray-300 w-10">
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

    <!-- Big settings -->
    <div class="w-full relative p-2">
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
  </div>

  <!-- Preview -->
  <div class="w-1/2 flex items-center justify-center relative opacity-90">
    <!-- Header -->
    <div class="absolute inset-x-0 top-0 w-full p-2 flex justify-end">
      <div class="bg-gray-100 px-4 py-1.5 flex items-center justify-center">
        <p class="text-sm text-black">Предварительный просмотр</p>

        <button class="ml-2">
          <SimpleIcon name="x" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        </button>
      </div>
    </div>

    <!-- Preview itself -->
    <div class="bg-gray-200 rounded-md border-2 border-dotted border-indigo-500">
      <PlayersTile />
    </div>
  </div>
</section>


<!-- divider -->
<div class="w-full flex justify-center px-2">
  <div class="my-8 w-full h-2 border-b-2 border-gray-200"></div>
</div>


<!-- Another tile settings -->
<div class="w-2/3 px-2">
  <h1 class="text-2xl text-black font-medium">Консоль</h1>
  <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aut cum repudiandae aspernatur quasi laudantium.</p> 
</div>

<!-- Content -->
<section class="mt-4 w-full flex items-stretch relative">
  <!-- Settings -->
  <div class="w-1/2 flex flex-wrap items-stretch">
    <!-- Toggler -->
    <div class="w-full relative p-2">
      <div class="bg-gray-100 p-4 w-full h-full">
        <!-- Header && Toggle -->
        <div class="w-full flex items-center justify-between">
          <!-- Title -->
          <div class="flex items-center">
            <!-- Icon -->
            <div class="p-2 bg-green-500 rounded-full flex items-center justify-center">
              <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
            </div>
  
            <!-- Text -->
            <p class="ml-2 text-md text-black font-medium">Отображать</p>
          </div>
  
          <!-- Toggle -->
          <div>
            <button class="rounded-full p-0.5 bg-gray-300 w-10">
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
    
    <!-- Another settings card -->
    <div class="w-full relative p-2">
      <div class="bg-gray-100 p-4 w-full h-full">
        <!-- Header && Toggle -->
        <div class="w-full flex items-center justify-between">
          <!-- Title -->
          <div class="flex items-center">
            <!-- Icon -->
            <div class="p-2 bg-yellow-500 rounded-full flex items-center justify-center">
              <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
            </div>
  
            <!-- Text -->
            <p class="ml-2 text-md text-black font-medium">Визуализировать песни</p>
          </div>
  
          <!-- Toggle -->
          <div>
            <button class="rounded-full p-0.5 bg-gray-300 w-10">
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
  </div>

  <!-- Preview -->
  <div class="w-1/2 flex items-center justify-center relative opacity-90">
    <!-- Header -->
    <div class="absolute inset-x-0 top-0 w-full p-2 flex justify-end">
      <div class="bg-gray-100 px-4 py-1.5 flex items-center justify-center">
        <p class="text-sm text-black">Предварительный просмотр</p>

        <button class="ml-2">
          <SimpleIcon name="x" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        </button>
      </div>
    </div>

    <!-- Preview itself -->
    <div class="bg-gray-200 rounded-md border-2 border-dotted border-indigo-500">
      <PlayersTile />
    </div>
  </div>
</section>