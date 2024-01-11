<script setup lang="tsx">
import { useApi } from "@directus/extensions-sdk"
import { onMounted, ref, watch } from "vue"
import editorFormatMenu from "../shared/components/editor-format-menu.vue"
import editorImageUpload from "../shared/components/editor-image-upload.vue"
import editorMenu from "../shared/components/editor-menu.vue"
import { setInitialContent } from "../shared/utils/slate"
import { createEditor, emptyValue, importPastedMarkdown } from "./utils"

import type { BlockEditor } from "./types"
import type { SlateDescendant } from "@mattiaz9/slate-jsx"
import type { BaseOperation } from "slate"

const api = useApi()

const interfaceRef = ref<HTMLDivElement | null>(null)
const slateRef = ref<HTMLDivElement | null>(null)
const editorRef = ref<BlockEditor | null>(null)
const isImporting = ref(false)

const props = defineProps<{
  value: unknown[] | null
  disabled?: boolean
  linkCollections?: string[]
}>()

const emit = defineEmits(["input"])

const showMenu = ref(false)

onMounted(() => {
  if (!slateRef.value) return

  const editor = createEditor(
    slateRef.value,
    props.value as SlateDescendant[] | null,
  )
  editorRef.value = editor

  const pasteCallback = slateRef.value.onpaste as
    | ((e: ClipboardEvent) => void)
    | null
  slateRef.value.onpaste = async (e) => {
    if (isImporting.value) return

    isImporting.value = true
    await importPastedMarkdown({
      event: e,
      editor,
      api,
      insuccessCallback: () => {
        pasteCallback?.(e)
      },
    })
    isImporting.value = false
  }

  const { onChange } = editor

  editor.onChange = (options?: { operation?: BaseOperation | undefined }) => {
    onChange(options)
    emit("input", editor.children)
  }

  // @ts-ignore
  window.editor = editor
})

watch(
  () => props.value,
  async (newVal: any, oldVal: any) => {
    setInitialContent(editorRef.value, newVal, emptyValue)
  },
)
</script>

<template>
  <div ref="interfaceRef" class="interface-editor">
    <div
      ref="slateRef"
      :class="{ editor: true, importing: isImporting }"
      :disabled="disabled || isImporting"
    />

    <editor-format-menu
      :editor="(editorRef as any)"
      :wrapper-element="interfaceRef"
      :linkCollections="linkCollections"
      :api="api"
    />

    <editor-menu
      :editor="(editorRef as any)"
      :wrapper-element="slateRef"
      :show="showMenu"
    />

    <editor-image-upload :editor="editorRef" />
  </div>
</template>

<style scoped>
.interface-editor {
  background-color: var(--theme--form--field--input--background);
  border: var(--theme--border-width) solid
    var(--theme--form--field--input--border-color);
  border-radius: var(--theme--border-radius);
  transition: var(--fast) var(--transition);
  transition-property: border-color, box-shadow;
  box-shadow: var(--theme--form--field--input--box-shadow);
  position: relative;
}
.interface-editor:hover:not(:disabled):not(:focus-within) {
  border-color: var(--theme--form--field--input--border-color-hover);
  box-shadow: var(--theme--form--field--input--box-shadow-hover);
}
.interface-editor:focus-within {
  border-color: var(--theme--form--field--input--border-color-focus);
  box-shadow: var(--theme--form--field--input--box-shadow-focus);
}

.editor {
  text-align: left;
  padding: 1rem 3rem;
  width: 100%;
  min-height: 5cm;
  text-underline-offset: 3px;
}
.editor.importing {
  opacity: 0.25;
  pointer-events: none;
}
.editor > div {
  width: 100%;
  white-space: pre-wrap;
}

:global(.editor [data-slate-node="element"]) {
  margin-block: 1em;
}
:global(.editor [data-slate-element="th"] [data-slate-node="element"]),
:global(.editor [data-slate-element="td"] [data-slate-node="element"]) {
  margin-block-start: 0.5em;
  margin-block-end: 0;
}
:global(
    .editor [data-slate-element="th"] [data-slate-node="element"]:first-child
  ),
:global(
    .editor [data-slate-element="td"] [data-slate-node="element"]:first-child
  ) {
  margin-block-start: 0;
}
:global(.editor strong) {
  font-weight: 700;
}
</style>
