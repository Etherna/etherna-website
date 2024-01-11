<script setup lang="ts">
import { useApi } from "@directus/extensions-sdk"
import { Editor, Range } from "slate"
import { computed, ref, watch } from "vue"
import { CaretPosition } from "../classes/caret-position"
import blockLinkEditor from "./block-link-editor.vue"

import type { LeafProps } from "../blocks/textual/leaf"
import type { BaseEditor } from "slate"
import type { CSSProperties } from "vue"

const props = defineProps<{
  editor: BaseEditor | null
  wrapperElement: HTMLElement | null
  linkCollections?: string[]
  api: ReturnType<typeof useApi>
}>()

const selectionMarkers = ref<LeafProps | undefined>(undefined)
const caretPosition = ref<CaretPosition>()
const marks = ref([
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "code",
] as const)
const marksIcons = ref({
  bold: "format_bold",
  italic: "format_italic",
  underline: "format_underlined",
  strikethrough: "strikethrough_s",
  code: "code",
})

const styles = computed(() => {
  const rect = caretPosition.value?.rect

  return {
    visibility: selectionMarkers.value ? "visible" : "hidden",
    top: rect ? `${rect.top - 8}px` : undefined,
    left: rect ? `${rect.left + rect.width / 2}px` : undefined,
  } satisfies CSSProperties
})

const linkMenuOpen = computed(() => {
  return (
    selectionMarkers.value?.href !== undefined ||
    selectionMarkers.value?.to !== undefined
  )
})

const emitUpdateMarks = defineEmits(["update:marks"])

watch(
  () => props.editor,
  (editor) => {
    if (!editor) return

    const onChange = editor.onChange

    editor.onChange = (op) => {
      onChange(op)
      updatePosition()
    }
  },
)

watch(
  () => props.wrapperElement,
  (wrapper) => {
    if (!wrapper) return

    caretPosition.value = new CaretPosition({ target: wrapper, keepLast: true })

    caretPosition.value.addEventListener("update", (rect) => {
      updatePosition()
    })
  },
)

function updatePosition() {
  if (!props.editor) return

  if (props.editor.selection && Range.isExpanded(props.editor.selection)) {
    // update selection markers
    const marks = Editor.marks(props.editor) as LeafProps | null
    selectionMarkers.value = {
      bold: marks?.bold === true,
      italic: marks?.italic === true,
      underline: marks?.underline === true,
      strikethrough: marks?.strikethrough === true,
      code: marks?.code === true,
      superscript: marks?.superscript === true,
      subscript: marks?.subscript === true,
      to: marks?.to,
      href: marks?.href,
      target: marks?.target,
    }
  } else {
    selectionMarkers.value = undefined
  }
}

function toggleMark(mark: keyof LeafProps) {
  if (!props.editor) return

  const isActive = selectionMarkers.value?.[mark]
  Editor.addMark(props.editor, mark, !isActive)

  emitUpdateMarks("update:marks", {
    ...selectionMarkers.value,
    [mark]: !isActive,
  })
}

function toggleLink() {
  if (!props.editor) return
  const hasLink =
    selectionMarkers.value?.href !== undefined ||
    selectionMarkers.value?.to !== undefined
  if (hasLink) {
    Editor.removeMark(props.editor, "href")
    Editor.removeMark(props.editor, "to")
    Editor.removeMark(props.editor, "target")
  } else {
    Editor.addMark(props.editor, "href", "")
  }
}

function updateMark(mark: keyof LeafProps, value: any) {
  if (!props.editor) return

  if (value == null) {
    Editor.removeMark(props.editor, mark)
  } else {
    Editor.addMark(props.editor, mark, value)
  }

  emitUpdateMarks("update:marks", {
    ...selectionMarkers.value,
    [mark]: value,
  })
}
</script>

<template>
  <div class="format-menu" :style="styles">
    <div class="format-menu-list">
      <v-button
        v-for="mark in marks"
        icon
        xSmall
        :secondary="!selectionMarkers?.[mark]"
        @click="toggleMark(mark)"
      >
        <v-icon :name="marksIcons[mark]" small />
      </v-button>

      <v-button icon xSmall :secondary="!linkMenuOpen" @click="toggleLink">
        <v-icon name="link" small />
      </v-button>
    </div>
    <div class="link-menu" v-if="linkMenuOpen">
      <block-link-editor
        :to="selectionMarkers?.to"
        :href="selectionMarkers?.href"
        :target="selectionMarkers?.target"
        :linkCollections="linkCollections"
        :api="api"
        @update:to="updateMark('to', $event)"
        @update:href="updateMark('href', $event)"
        @update:target="updateMark('target', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.format-menu {
  visibility: hidden;
  position: fixed;
  transform: translate(-50%, -100%);
  border-radius: var(--theme--border-radius);
  background-color: var(--background-normal-alt);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 50;
}

.format-menu-list {
  display: flex;
  gap: 0.5rem;
}

.link-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
