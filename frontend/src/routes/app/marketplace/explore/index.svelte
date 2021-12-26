<script lang="ts">
  // Importing modules
  import { SimpleIcon } from 'src/design';
</script>

<!-- Layout -->
<main class="w-full h-full flex">
  <!-- Sidebar -->
  <div class="px-4 pt-6 w-1/5 h-full">
    <!-- Filter by resource type -->
    <div>
      <!-- Header -->
      <div class="w-full flex items-center opacity-80 justify-between border-b-2 border-black pb-1.5">
        <div class="flex items-center">
          <SimpleIcon name="filter" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />

          <p class="ml-1.5 text-base text-black">Тип контента</p>
        </div>

        <SimpleIcon name="chevron-up" attrs={{ class: "ml-1 w-4 h-4 text-black", "stroke-width": "2.5" }} />
      </div>

      <!-- Types -->
      <div class="mt-4">
        <div class="my-1 flex items-center justify-between opacity-80">
          <p class="text-sm">Нода</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-gray-400" }} />
        </div>

        <div class="my-1 flex items-center justify-between opacity-80">
          <p class="text-sm">Плагин</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-gray-400" }} />
        </div>

        <div class="my-1 flex items-center justify-between">
          <p class="text-sm">Коллекция</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-black" }} />
        </div>
      </div>
    </div>
    
    <!-- Filter by node type -->
    <div class="my-8">
      <!-- Header -->
      <div class="w-full flex items-center opacity-80 justify-between border-b-2 border-black pb-1.5">
        <div class="flex items-center">
          <SimpleIcon name="filter" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />

          <p class="ml-1.5 text-base text-black">Тип ноды</p>
        </div>

        <SimpleIcon name="chevron-up" attrs={{ class: "ml-1 w-4 h-4 text-black", "stroke-width": "2.5" }} />
      </div>

      <!-- Types -->
      <div class="mt-4">
        <div class="my-1 flex items-center justify-between opacity-80">
          <p class="text-sm">Действие</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-gray-400" }} />
        </div>

        <div class="my-1 flex items-center justify-between opacity-80">
          <p class="text-sm">Условие</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-gray-400" }} />
        </div>

        <div class="my-1 flex items-center justify-between opacity-80">
          <p class="text-sm">Ивент</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-gray-400" }} />
        </div>

        <div class="my-1 flex items-center justify-between">
          <p class="text-sm">Переменная</p>

          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-black" }} />
        </div>
      </div>
    </div>

    <!-- Collections -->
    <div class="mb-8">
      <!-- Header -->
      <div class="w-full flex items-center opacity-80 justify-between border-b-2 border-black pb-1.5">
        <div class="flex items-center">
          <SimpleIcon name="folder" attrs={{ class: "w-4 h-4 text-black", "stroke-width": "2.5" }} />

          <p class="ml-1.5 text-base text-black">Ваши Коллекции</p>
        </div>

        <SimpleIcon name="chevron-up" attrs={{ class: "ml-1 w-4 h-4 text-black", "stroke-width": "2.5" }} />
      </div>

      <!-- List -->
      <div class="mt-4">
        <!-- Collection item -->
        <div class="w-full my-1 bg-gray-100 p-2">
          <!-- Header -->
          <div>
            <h1 class="text-md font-medium text-black">Моя Личная Коллекция</h1>
            <p class="text-sm text-black opacity-80">80 елементов</p>
          </div>

          <!-- Footer -->
          <div class="mt-2 flex items-center justify-between">
            <!-- Creator -->
            <div class="flex items-center">
              <div class="w-5 h-5 rounded-full bg-red-500"></div>
            </div>

            <!-- Statistics -->
            <div class="flex items-center justify-between">
              <!-- Update date -->
              <div class="flex items-center">
                <SimpleIcon name="calendar" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">12.02.2021</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Second collection -->
        <div class="w-full my-1 bg-gray-100 p-2">
          <!-- Header -->
          <div>
            <h1 class="text-md font-medium text-black">Вторая Коллекция</h1>
            <p class="text-sm text-black opacity-80">69 елементов</p>
          </div>

          <!-- Footer -->
          <div class="mt-2 flex items-center justify-between">
            <!-- Creator -->
            <div class="flex items-center">
              <div class="w-5 h-5 rounded-full bg-red-500"></div>
            </div>

            <!-- Statistics -->
            <div class="flex items-center justify-between">
              <!-- Update date -->
              <div class="flex items-center">
                <SimpleIcon name="calendar" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">24.02.2069</p>
              </div>
            </div>
          </div>
        </div>

        <!-- More collections button -->
        <div class="w-full my-1 border-2 border-gray-100 p-2 pt-4">
          <!-- Text -->
          <div>
            <h1 class="text-lg text-black font-medium">Весь список</h1>
            <p class="text-xs text-black opacity-80">Всего 12 коллекций</p>
          </div>

          <!-- Button -->
          <button class="mt-1.5 px-3 py-1 border-2 border-black flex items-center justify-center">
            <p class="text-black text-xs">Перейти</p>

            <SimpleIcon name="external-link" attrs={{ class: "w-3 h-3 text-black ml-1.5", "stroke-width": "3" }} />
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="w-4/5">
    <!-- Mini-header -->
    <div class="w-full p-2 mt-6 flex items-stretch justify-between">
      <!-- Search bar -->
      <div class="w-1/2 relative bg-gray-200 rounded-sm px-2 py-2 flex items-center">
        <SimpleIcon name="search" attrs={{ class: "w-4 h-4 text-black mr-2 opacity-40", "stroke-width": "2.5" }} />

        <input class="bg-gray-200" placeholder="Поиск..." type="text">
      </div>

      <!-- Buttons -->
      <div class="w-1/2 flex justify-end">
        <!-- Create new addon button -->
        <button class="mx-2 px-4 flex items-center justify-center bg-black">
          <p class="text-white text-sm mr-2">Создать</p>

          <SimpleIcon name="code" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
        </button>

      </div>
    </div>

    <!-- Hero -->

    <!-- Items list -->
    <div class="w-full mt-4 flex items-stretch flex-wrap">
      
      <!-- 1st Item (type: conditional) -->
      <div class="w-1/3 p-2 relative">
        <div class="flex flex-col justtify-between bg-gray-100 p-3 h-full">
          <!-- Language iterpreation -->
          <div class="mb-4 relative w-full flex text-lg text-black font-medium pr-4">
            <!-- Help info -->
            <div class="absolute top-0 right-0">
              <SimpleIcon name="help-circle" attrs={{ class: "mt-2 w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </div>
            
            <p>Если <span class="rounded-full bg-gray-200 px-2 py-0.5">игрок</span> имеет при себе <span class="rounded-full bg-gray-200 px-2 py-0.5">предмет</span></p>
          </div>

          <!-- Footer -->
          <div class="w-full flex items-center justify-between">
            <!-- Item type -->
            <div class="flex items-center">
              <!-- Type Icon -->
              <div class="w-6 h-6 rounded-md bg-yellow-400 flex items-center justify-center">
                <SimpleIcon name="git-branch" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "3" }} />
              </div>

              <!-- Type Name -->
              <div class="ml-2">
                <h1 class="text-sm text-black">Условие</h1>
              </div>
            </div>

            <!-- Statistics -->
            <div class="flex items-center opacity-80">
              <!-- Uses -->
              <div class="flex items-center mr-3">
                <SimpleIcon name="download" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">125k</p>
              </div>

              <!-- Likes -->
              <div class="flex items-center">
                <SimpleIcon name="heart" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">2,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2nd Item (type: action) -->
      <div class="w-1/3 p-2 relative">
        <div class="flex flex-col justtify-between bg-gray-100 p-3 h-full">
          <!-- Language iterpreation -->
          <div class="mb-4 relative w-full flex text-lg text-black font-medium pr-4">
            <!-- Help info -->
            <div class="absolute top-0 right-0">
              <SimpleIcon name="help-circle" attrs={{ class: "mt-2 w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </div>
            
            <p>Отобразить <span class="rounded-full bg-gray-200 px-2 py-0.5">голограмму</span> перед <span class="rounded-full bg-gray-200 px-2 py-0.5">существом</span></p>
          </div>

          <!-- Footer -->
          <div class="w-full flex items-center justify-between">
            <!-- Item type -->
            <div class="flex items-center">
              <!-- Type Icon -->
              <div class="w-6 h-6 rounded-md bg-red-400 flex items-center justify-center">
                <SimpleIcon name="fast-forward" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "3" }} />
              </div>

              <!-- Type Name -->
              <div class="ml-2">
                <h1 class="text-sm text-black">Действие</h1>
              </div>
            </div>

            <!-- Statistics -->
            <div class="flex items-center opacity-80">
              <!-- Uses -->
              <div class="flex items-center mr-3">
                <SimpleIcon name="download" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">125k</p>
              </div>

              <!-- Likes -->
              <div class="flex items-center">
                <SimpleIcon name="heart" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">2,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3rd Item (type: event) -->
      <div class="w-1/3 p-2 relative">
        <div class="flex flex-col justify-between bg-gray-100 p-3 h-full">
          <!-- Language iterpreation -->
          <div class="mb-4 relative w-full flex text-lg text-black font-medium pr-4">
            <!-- Help info -->
            <div class="absolute top-0 right-0">
              <SimpleIcon name="help-circle" attrs={{ class: "mt-2 w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </div>
            
            <p>При появлении <span class="rounded-full bg-gray-200 px-2 py-0.5">существа</span></p>
          </div>

          <!-- Footer -->
          <div class="w-full flex items-center justify-between">
            <!-- Item type -->
            <div class="flex items-center">
              <!-- Type Icon -->
              <div class="w-6 h-6 rounded-md bg-purple-400 flex items-center justify-center">
                <SimpleIcon name="triangle" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "3" }} />
              </div>

              <!-- Type Name -->
              <div class="ml-2">
                <h1 class="text-sm text-black">Ивент</h1>
              </div>
            </div>

            <!-- Statistics -->
            <div class="flex items-center opacity-80">
              <!-- Uses -->
              <div class="flex items-center mr-3">
                <SimpleIcon name="download" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">125k</p>
              </div>

              <!-- Likes -->
              <div class="flex items-center">
                <SimpleIcon name="heart" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">1,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4th Item (type: data) -->
      <div class="w-1/3 p-2 relative">
        <div class="flex flex-col justtify-between bg-gray-100 p-3 h-full">
          <!-- Language iterpreation -->
          <div class="mb-4 relative w-full flex text-lg text-black font-medium pr-4">
            <!-- Help info -->
            <div class="absolute top-0 right-0">
              <SimpleIcon name="help-circle" attrs={{ class: "mt-2 w-4 h-4 text-black", "stroke-width": "2.5" }} />
            </div>
            
            <p>Создать голограмму с <span class="rounded-full bg-gray-200 px-2 py-0.5">настройками</span></p>
          </div>

          <!-- Footer -->
          <div class="w-full flex items-center justify-between">
            <!-- Item type -->
            <div class="flex items-center">
              <!-- Type Icon -->
              <div class="w-6 h-6 rounded-md bg-green-400 flex items-center justify-center">
                <SimpleIcon name="file" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "3" }} />
              </div>

              <!-- Type Name -->
              <div class="ml-2">
                <h1 class="text-sm text-black">Переменная</h1>
              </div>
            </div>

            <!-- Statistics -->
            <div class="flex items-center opacity-80">
              <!-- Uses -->
              <div class="flex items-center mr-3">
                <SimpleIcon name="download" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">125k</p>
              </div>

              <!-- Likes -->
              <div class="flex items-center">
                <SimpleIcon name="heart" attrs={{ class: "w-3 h-3 text-black", "stroke-width": "3.5" }} />

                <p class="text-xs text-black ml-1">2,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>