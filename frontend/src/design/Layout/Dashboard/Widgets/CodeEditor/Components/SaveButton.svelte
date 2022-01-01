<div class="mx-2 py-1.5 px-2 flex items-center justify-center opacity-80 text-black hover:bg-black hover:text-white rounded-md">
  <!-- { #if changes.waiting }
    <SimpleIcon name="more-horizontal" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />
    
    <p class="text-xs ml-1.5">Ожидание...</p>
  { :else }
    { #if changes.list.length > 0 }
      <RadialSpinner color="#000" size={10} />
       -->
      <!-- <p class="text-xs ml-1.5">Сохранение...</p> -->
    <!-- { :else } -->
      <p class="text-xs">Сохранено</p>
    <!-- { /if } -->
  <!-- { /if } -->
</div>
