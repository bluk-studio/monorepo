<script lang="ts">
  // Importing modules
  import { SimpleIcon, RadialSpinner } from 'src/design';
  import type { IDeleteProjectMutationResponse } from 'src/queries';
  import { DeleteProject } from 'src/queries';
  import { CurrentProject, ProfileProjects } from '$stores/project';
  import { client } from 'src/stores/graphql';

  import { goto } from '$app/navigation';

  // function deleteProject
  async function deleteProject() {
    loading = true;

    // Making request
    const response = (await client.mutate(DeleteProject, { 
      variables: {
        projectId: $CurrentProject.project._id,
      },
    })) as IDeleteProjectMutationResponse;

    // Redirecting user
    CurrentProject.clear();
    ProfileProjects.clear();
    ProfileProjects.fetch();

    goto('/app');
  };

  let loading: boolean = false;
</script>

<!-- Content -->
<section class="w-full flex flex-wrap items-stretch">
  <!-- +todo: Freeze project -->
  <!-- <div class="w-1/2 relative p-2">
    <div class="bg-gray-100 p-4 w-full h-full">
      #Header
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center">
          #Icon
          <div class="p-2 bg-indigo-500 rounded-full flex items-center justify-center">
            <SimpleIcon name="cloud-off" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
          </div>
    
          #Text
          <div class="ml-2 flex items-center">
            <p class="text-md text-black font-medium">Заморозить проект</p>
          </div>
        </div>

        #Loading spinner
        #<RadialSpinner color="#000" size={16} />
      </div>

      #Description
      <div class="my-2">
        <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum possimus nostrum inventore. Explicabo atque fugit commodi!</p>
      </div>

      #Button
      <div class="w-full mt-4 bg-gray-200 rounded-md flex items-center relative">
        <button class="w-full px-4 py-2 bg-indigo-500 flex items-center justify-start">
          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white" }} />

          <p class="text-sm text-white font-medium ml-2">Заморозить проект</p>
        </button>
      </div>

      #Input PS
      <p class="mt-1.5 text-xs text-black opacity-80">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, a!</p>
    </div>
  </div> -->

  <!-- Delete project -->
  <div class="w-1/2 relative p-2">
    <div class="bg-gray-100 p-4 w-full h-full">
      <!-- Header -->
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center">
          <!-- Icon -->
          <div class="p-2 bg-red-500 rounded-full flex items-center justify-center">
            <SimpleIcon name="alert-triangle" attrs={{ class: "w-4 h-4 text-white", "stroke-width": "2.5" }} />
          </div>
    
          <!-- Text -->
          <div class="ml-2 flex items-center">
            <p class="text-md text-black font-medium">Удалить проект</p>
          </div>
        </div>

        <!-- Loading spinner -->
        { #if loading }
          <RadialSpinner color="#000" size={16} />
        { /if }
      </div>

      <!-- Description -->
      <div class="my-2">
        <p class="text-sm text-black opacity-80">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum possimus nostrum inventore. Explicabo atque fugit commodi!</p>
      </div>

      <!-- Button -->
      <div class="w-full mt-4 bg-gray-200 rounded-md flex items-center relative">
        <button on:click={deleteProject} class="w-full px-4 py-2 bg-red-500 flex items-center justify-start">
          <SimpleIcon name="check" attrs={{ class: "w-4 h-4 text-white" }} />

          <p class="text-sm text-white font-medium ml-2">Удалить проект</p>
        </button>
      </div>

      <!-- Input PS -->
      <p class="mt-1.5 text-xs text-black opacity-80">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, a!</p>
    </div>
  </div>
</section>