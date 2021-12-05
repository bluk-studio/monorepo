<script lang="ts">
  // Importing modules
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { SimpleIcon } from 'src/design';

  import { SettingsCategories } from 'src/config';

  // +todo
  let currentCategoryId;
  page.subscribe(() => {
    const splittedPath = $page.path.split('/');
    currentCategoryId = splittedPath[splittedPath.length - 1];
  });
</script>

<section class="w-full relative flex">
  <!-- Sidebar -->
  <div class="w-1/4 h-full overflow-y-auto px-2 pt-4">
    <!-- Back button -->
    <button on:click={() => {
      goto(`/app/${$page.params.projectId}/dashboard`)
    }} class="mb-2 w-full bg-black px-4 py-2 flex items-center justify-start">
      <SimpleIcon name="chevron-left" attrs={{ class: "w-4 h-4 text-white" }} />

      <p class="ml-1.5 text-white text-sm">Вернуться назад</p>
    </button>

    { #each SettingsCategories as category }
      <button on:click={() => {
        goto(`/app/${$page.params.projectId}/settings/${category.id}`)
      }} class="w-full px-4 py-2 my-1.5 flex items-center justify-start opacity-80 { category.id == currentCategoryId ? 'bg-gray-100' : '' }">
        <SimpleIcon name="{ category.icon }" attrs={{ class: 'w-4 h-4 text-black' }} />
      
        <p class="text-sm text-black ml-2">{ category.title }</p>
      </button>
    { /each }
  </div>

  <!-- Content -->
  <div class="w-3/4 py-2">
    <slot />
  </div>
</section>