<script lang="ts">
  import type monaco from 'monaco-editor';
  import { onMount } from 'svelte';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import RadialSpinner from 'src/design/Loaders/RadialSpinner.svelte';

  let divEl: HTMLDivElement = null;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let Monaco;

  // test libSource
  let libSource = [
    'declare class Facts {',
    '    /**',
    '     * Returns the next fact',
    '     */',
    '    static next():string',
    '}'
  ].join('\n');
  let libUri = 'ts:filename/facts.d.ts';
  let loading = true;

  // onMount function
  onMount(async () => {
    // @ts-ignore
    self.MonacoEnvironment = {
      getWorker: function (_moduleId: any, label: string) {
        if (label === 'json') {
          return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker();
        }
        return new editorWorker();
      }
    };

    Monaco = await import('monaco-editor');
    Monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    });

    // compiler options
    Monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: Monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true
    });

    Monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    Monaco.editor.createModel(libSource, 'typescript', Monaco.Uri.parse(libUri));

    // Creating Monaco editor
    editor = Monaco.editor.create(divEl, {
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript'
    });

    loading = false;

    return () => {
      editor.dispose();
    };
  });
</script>

<div class="w-full h-screen relative">
  { #if loading }
    <div class="z-20 w-full h-full absolute flex flex-col items-center justify-center">
      <RadialSpinner color="#000" size={15} />
      <p class="text-black text-sm mt-2">Загружаем редактор...</p>
    </div>
  { /if }

  <div bind:this={divEl} class="w-full h-full" />
</div>