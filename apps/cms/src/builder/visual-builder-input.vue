<script setup lang="ts">
import { useApi } from "@directus/extensions-sdk"
import { computed, onMounted, reactive, ref, watch } from "vue"
import editorFormatMenu from "../shared/components/editor-format-menu.vue"
import editorImageUpload from "../shared/components/editor-image-upload.vue"
import { setInitialContent } from "../shared/utils/slate"
import BlockAdder from "./blocks/block-adder.vue"
import BlockExtraSettings from "./blocks/block-extra-settings.vue"
import { createEditor, emptyValue, fixInitialValue } from "./utils"

import type { BlockEditor } from "./types"
import type { SlateElement } from "@mattiaz9/slate-jsx"
import type { BaseOperation, Path } from "slate"

const api = useApi()

const interfaceRef = ref<HTMLDivElement | null>(null)
const slateRef = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  value: unknown[] | null
  disabled?: boolean
  linkCollections?: string[]
}>()

const data = reactive({
  editor: null as BlockEditor | null,
  isImporting: false,
  currentElement: undefined as
    | { element: SlateElement<any>; path: Path }
    | undefined,
})

const emit = defineEmits(["input"])

const lastPath = computed(() => {
  const editor = data.editor
  const count = editor?.children.length ?? 0

  return [count] as Path
})

onMounted(() => {
  if (!slateRef.value) return

  const initialValue = props.value ? fixInitialValue(props.value) : props.value

  const editor = createEditor(slateRef.value, initialValue)
  data.editor = editor

  const { onChange } = editor

  editor.onChange = (options?: { operation?: BaseOperation | undefined }) => {
    onChange(options)
    console.log("onChange", options?.operation)
    emit("input", editor.children)
  }

  // @ts-ignore
  window.editor = editor
})

watch(
  () => props.value,
  async (newVal: any, oldVal: any) => {
    const value = newVal ? fixInitialValue(newVal) : newVal
    setInitialContent(data.editor, value, emptyValue)
  },
)
</script>

<template>
  <div ref="interfaceRef" class="interface-builder">
    <div
      ref="slateRef"
      :class="{ editor: true, importing: data.isImporting }"
      :disabled="disabled || data.isImporting"
    />

    <block-adder :editor="data.editor!" :path="lastPath" />

    <editor-format-menu
      :editor="data.editor!"
      :wrapper-element="interfaceRef"
      :linkCollections="linkCollections"
      :api="api"
    />

    <editor-image-upload :editor="data.editor" />

    <block-extra-settings
      :editor="data.editor!"
      :link-collections="linkCollections"
    />
  </div>
</template>

<style scoped>
.interface-builder {
  background-color: var(--theme--form--field--input--background);
  border: var(--theme--border-width) solid
    var(--theme--form--field--input--border-color);
  border-radius: var(--theme--border-radius);
  transition: var(--fast) var(--transition);
  transition-property: border-color, box-shadow;
  box-shadow: var(--theme--form--field--input--box-shadow);
  position: relative;
  padding: 1rem 3rem;
}
.interface-builder:hover:not(:disabled):not(:focus-within) {
  border-color: var(--theme--form--field--input--border-color-hover);
  box-shadow: var(--theme--form--field--input--box-shadow-hover);
}
.interface-builder:focus-within {
  border-color: var(--theme--form--field--input--border-color-focus);
  box-shadow: var(--theme--form--field--input--box-shadow-focus);
}

.editor {
  text-align: left;
  width: 100%;
  min-height: 5cm;
  text-underline-offset: 3px;
}
</style>
