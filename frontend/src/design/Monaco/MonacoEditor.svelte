<script lang="ts">
  // Importing modules
  import type monaco from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import { onMount } from 'svelte';

  let divEl: HTMLDivElement = null;
  let Monaco;
  export let editor: monaco.editor.IStandaloneCodeEditor;
  export let loading = true;

  // onMount function
  onMount(async () => {
    console.log('editor onMount');

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

    // Defining custom theme
    Monaco.editor.defineTheme('WhiteTheme', {
      base: 'vs',
      inherit: true,
      rules: [{ background: 'f8fafc' }],
      colors: {
        'editor.background': '#f8fafc',
      }
    });

    // Setting white theme as default
    Monaco.editor.setTheme('WhiteTheme');
    
    // Creating Monaco editor
    editor = Monaco.editor.create(divEl, {
      value: '',
      language: 'javascript'
    });
    
    // Updating tab size
    editor.getModel().updateOptions({ tabSize: 2 });

    console.log('editor loaded');
    loading = false;

    return () => {
      editor.dispose();
    };
  });

</script>

<!-- Layout -->
<div bind:this={divEl} class="w-full h-full"></div>