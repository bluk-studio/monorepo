<script lang="ts">
import { goto } from '$app/navigation';

  // Importing modules
  import { SimpleIcon } from 'src/design';
</script>

<!-- Hero -->
<section class="w-full h-screen bg-gray-100 flex items-center justify-between relative px-6 md:px-12">
  <!-- Text -->
  <div class="w-full md:w-2/4">
    <h1 class="text-6xl text-black font-medium">Бесплатный <span class="border-b-4 border-yellow-300">Визуальный Язык</span> и <span class="border-b-4 border-yellow-300">Хостинг</span> для Майнкрафта.</h1>
  </div>

  <!-- Hero Footer -->
  <div class="absolute inset-x-0 bottom-0 w-full flex items-center justify-between px-6 py-4 bg-gray-200">
    <!-- Left panel -->
    <div class="flex items-center opacity-90">
      <!-- Logotype -->
      <div class="mr-2 flex items-center">
        <!-- bluk-studio-black.svg -->
        <img src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1636810372/bluk-studio-black.svg" alt="bluk.studio black logotype" class="mr-2 w-6 h-6">

        <h1 class="text-xl text-black font-bold">bluk</h1>
      </div>

      <!-- Links -->
      <a href="#" class="text-black text-sm mx-4">Документация</a>
      <a href="#" class="text-black text-sm mx-4">Плагины</a>
    
      <!-- More -->
      <button class="flex items-center mx-4">
        <SimpleIcon name="external-link" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
        
        <p class="text-black text-sm ml-1.5">Больше</p>
      </button>
    </div>

    <!-- Right panel -->
    <div class="flex items-center">
      <!-- Login button -->
      <button on:click={() => {
        goto('/app');
      }} class="px-6 py-1.5 bg-black border-2 border-black rounded-sm mx-4">
        <p class="text-white text-sm">Войти</p>
      </button>

      <!-- Discover more -->
      <button class="px-6 py-1.5 border-2 border-black rounded-sm">
        <p class="text-black text-sm">Узнать больше</p>
      </button>
    </div>
  </div>
</section>
