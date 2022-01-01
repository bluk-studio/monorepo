<script lang="ts">
  // Importing modules
  import { onMount } from 'svelte';
  import RadialSpinner from 'src/design/Loaders/RadialSpinner.svelte';
  import { CurrentRawPluginStore } from 'src/modules/Plugins';
  import { EditorStore } from 'src/modules/Editor';
  import { SimpleIcon } from 'src/design';
  import { CurrentProject } from 'src/stores/project';
  import type { IContentChange, EActionEventType, InsertContentPayload, ReplaceContentPayload, DeleteContentPayload } from '@app/shared';

  import type monaco from 'monaco-editor';
  import type CollaborationExt from '@convergencelabs/monaco-collab-ext';
  import MonacoEditor from 'src/design/Monaco/MonacoEditor.svelte';

  import { CollaboratorsButton, SaveButton } from './Components';
  import { EditorContentSubscription } from 'src/modules/Session';
  import { events } from 'src/modules/Events';
import { CurrentProfile } from '$stores/profile';

  // Variables
  let loading = true;
  let editorLoading = true;

  let code: string[];
  let editor: monaco.editor.IStandaloneCodeEditor;
  let MonacoCollabExt: typeof CollaborationExt;
  
  // Local changes array
  let changes: {
    waiting: boolean,
    list: {
      changes: IContentChange[],
    }[]
  } = {
    waiting: false,
    list: [],
  };

  let lastChangeTime: number;
  let askUpdateInterval;
  
  // Function, that'll monitor local changes
  // and push them if needed
  async function monitorLocalChanges() {
    if (changes.list.length > 0 && !changes.waiting) {
      const entry = changes.list.shift();
      
      // Updating
      await CurrentRawPluginStore.pushChange(entry.changes);
    };

    // Timeout
    await new Promise((resolve) => setTimeout(() => resolve(null), 100));

    // Monitor everything else;
    monitorLocalChanges();
  };

  // function, that'll add new changes to our changes list
  function askUpdate() {
    lastChangeTime = Date.now();

    if (!askUpdateInterval) {
      // Starting interval
      askUpdateInterval = setInterval(() => {
        const now = Date.now();

        // Checking last change time
        if ((now - lastChangeTime) > 1000) {
          // Updating
          changes.waiting = false;

          // Determining changes
          const newCode = editor.getModel().getValue().split('\n');
          const updatedCode: IContentChange[] = [];

          // +todo optimize
          code.forEach((line, index) => {
            // if (code[index] != line) {
              updatedCode.push({
                index,
                text: line,
              })
            // };
          });

          changes.list.push({
            changes: updatedCode,
          });

          // Clearing interval
          clearInterval(askUpdateInterval);
          askUpdateInterval = null;
        } else {
          changes.waiting = true;
        };
      }, 250);
    };
  };

  // function, that'll monitor remote changes

  $: store = $EditorStore.resourceType == 'RAW_PLUGIN' ? CurrentRawPluginStore : CurrentRawPluginStore;

  // onMount function
  onMount(async () => {
    // Waiting for editor to bootstrap
    await new Promise((resolve) => {
      let interval = setInterval(() => {
        if (!editorLoading) {
          resolve(null);
          clearInterval(interval);
        };
      }, 100);
    });

    MonacoCollabExt = await import('@convergencelabs/monaco-collab-ext');

    // Subscribing to content changes
    EditorContentSubscription.subscribe();

    // > Listening to different events
    // > > Insert Content
    events.on('editor.content.insertContent', (payload: InsertContentPayload) => {
      console.log('received insertContent event with payload:');
      console.log(payload);

      if (payload.collaboratorId != String($CurrentProfile.profile?._id)) {
        EditorContentManager.insert(payload.index, payload.text);
      };
    });

    // > > Replace Content
    events.on('editor.content.replaceContent', (payload: ReplaceContentPayload) => {
      console.log('received replaceContent event with payload:');
      console.log(payload);
      
      if (payload.collaboratorId != String($CurrentProfile.profile?._id)) {
        EditorContentManager.replace(payload.index, payload.length, payload.text);
      };
    });

    // > > Delete Content
    events.on('editor.content.deleteContent', (payload: DeleteContentPayload) => {
      console.log('received deleteContent event with payload:');
      console.log(payload);
    
      if (payload.collaboratorId != String($CurrentProfile.profile?._id)) {
        EditorContentManager.delete(payload.index, payload.length);
      };
    });

    // Enabling Collaboration extension
    const EditorContentManager = new MonacoCollabExt.EditorContentManager({
      editor: editor,
      onInsert: (index, text) => {
        // Sending INSERT_CONTENT event
        EditorContentSubscription.push('INSERT_CONTENT' as EActionEventType, {
          resourceId: $EditorStore.resourceId,
          collaboratorId: String($CurrentProfile.profile?._id),

          index,
          text,
        });
      },
      onReplace: (index, length, text) => {
        // Sending REPLACE_CONTENT event
        EditorContentSubscription.push('REPLACE_CONTENT' as EActionEventType, {
          resourceId: $EditorStore.resourceId,
          collaboratorId: String($CurrentProfile.profile?._id),

          index,
          length,
          text,
        });
      },
      onDelete: (index, length) => {
        // Sending DELETE_CONTENT event
        EditorContentSubscription.push('DELETE_CONTENT' as EActionEventType, {
          resourceId: $EditorStore.resourceId,
          collaboratorId: String($CurrentProfile.profile?._id),

          index,
          length,
        });
      },
    })

    // Fetching Current<RawPlugin|Node> code
    const fetchedCode: string[] = await new Promise((resolve) => {
      store.subscribe((object) => {
        // +todo error handling
        if (object.code) {
          resolve(object.code);
        };
      });
    });

    // Updating editor's code variable and local code
    // variable
    editor.getModel().setValue(fetchedCode.join('\n'));
    code = fetchedCode;
  
    // Starting local changes monitoring
    monitorLocalChanges();

    loading = false;
  });
</script>

<!-- Container -->
<div class="w-full h-full relative flex flex-col">
  { #if loading }
    <!-- Loading screen -->
    <div class="z-20 bg-gray-50 w-full h-full absolute flex flex-col items-center justify-center">
      <RadialSpinner color="#000" size={15} />
      <p class="text-black text-sm mt-2">Загружаем редактор...</p>
    </div>
  { /if }

  <!-- Header -->
  <div on:pointerdown class="cursor-pointer z-0 w-full flex justify-start items-stretch bg-gray-100 py-2 px-4 shadow-b-md">
    <!-- Currently selected resource information -->
    <div class="mr-2">
      <!-- Text -->
      <h1 class="text-md text-black font-medium">{ $CurrentRawPluginStore.title }</h1>

      <!-- Current Project information -->
      { #if $CurrentProject.loaded && $CurrentProject?.project?._id != null }
        <div class="flex items-center">
          <!-- Icon -->
          <SimpleIcon name="archive" attrs={{ class: "w-3 h-3 text-black mr-1", "stroke-width": "2.5" }} />

          <!-- Button -->
          <button class="px-1 py-0.5 flex items-center justify-center opacity-80 text-black hover:bg-black hover:text-white">
            <p class="text-xs mr-1">{ $CurrentProject.project.name }</p>

            <SimpleIcon name="external-link" attrs={{ class: "w-3 h-3", "stroke-width": "2.5" }} />
          </button>
        </div>
      { /if }
    </div>

    <!-- Information about collaborators -->
    <CollaboratorsButton />

    <!-- Is Updated information -->
    <SaveButton />
  </div>

  <!-- Editor -->
  <div class="w-full flex-grow bg-gray-50 relative">
    <MonacoEditor bind:editor={editor} bind:loading={editorLoading} />
  </div>

  <!-- Footer -->
  <div class="w-full bg-gray-100 py-2 px-4 flex items-center shadow-t-md">
    <!-- Control buttons -->
    <div class="w-1/3 flex items-center">
      <!-- Change theme -->
      <button class="flex items-center justify-center p-2 mx-1 rounded-md hover:bg-black text-black hover:text-white">
        <SimpleIcon name="moon" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button>

      <!-- Edit plugin button -->
      <button class="flex items-center justify-center p-2 mx-1 rounded-md hover:bg-black text-black hover:text-white">
        <SimpleIcon name="edit-2" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button>

      <!-- Documentation button -->
      <button class="flex items-center justify-center p-2 mx-1 rounded-md hover:bg-black text-black hover:text-white">
        <SimpleIcon name="help-circle" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button>
    </div>

    <!-- View buttons -->
    <div class="w-1/3 flex items-center justify-center">
      <!-- Code widget -->
      <button class="flex items-center justify-center p-2 mx-1 rounded-md hover:bg-black text-indigo-500 hover:text-white">
        <SimpleIcon name="code" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button>

      <!-- Logs widget -->
      <button class="flex items-center justify-center p-2 mx-1 rounded-md hover:bg-black text-black hover:text-white">
        <SimpleIcon name="align-left" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button>

      <!-- Other widgets -->
      <button class="flex items-center justify-center p-2 mx-1 rounded-md hover:bg-black text-black hover:text-white">
        <SimpleIcon name="more-horizontal" attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
      </button>
    </div>

    <!-- StatusBar -->
    <!-- <div class="w-1/3 flex items-center justify-end">
      #Current status
      { #if $EditorStore.statusBar?.text != null }
        <div class="flex items-center">
          #Icon
          { #if $EditorStore.statusBar.icon }
            <SimpleIcon name={$EditorStore.statusBar.icon} attrs={{ class: "w-4 h-4", "stroke-width": "2.5" }} />
          { :else }
            <RadialSpinner color="#fb923c" size={15} />
          { /if }

          #Text
          <p class="text-sm text-black opacity-80 ml-1.5">{ $EditorStore.statusBar.text }</p>

          { #if $EditorStore.statusBar.finished }
            <button class="bg-black px-1 py-0.5 ml-2 rounded-md flex items-center justify-center">
              <SimpleIcon name="external-link" attrs={{ class: "w-3 h-3 text-white", "stroke-width": "2.5" }} />

              <p class="text-xs text-white ml-1">Посмотреть</p>
            </button>
          { /if }
        </div>
      { /if }
    </div> -->
  </div>
</div>