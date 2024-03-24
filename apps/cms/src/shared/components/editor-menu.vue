<script setup lang="ts">
import { Editor, Path, Transforms } from "slate"
import { computed, ref, watch } from "vue"
import { CaretPosition } from "../classes/caret-position"
import SettingsTable from "./settings-table.vue"

import type { BlockEditor, SlateBlock, SlateElement } from "@mattiaz9/slate-jsx"
import type { NodeEntry } from "slate"
import type { CSSProperties } from "vue"

const props = defineProps<{
  editor: BlockEditor<any, any> | null
  wrapperElement: HTMLElement | null
}>()

const show = ref(false)
const caretPosition = ref<CaretPosition | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const currentBlock = ref<{
  element: SlateElement<any>
  path: Path
  isEmpty: boolean
} | null>(null)

const styles = computed(() => {
  if (!currentBlock.value) return

  const rect = caretPosition.value?.rect
  const caretCorrection = rect ? rect.height / 2 : 0

  return {
    opacity: show.value ? 1 : 0,
    top: rect ? `${rect.top + caretCorrection}px` : undefined,
    left: rect
      ? `${(props.wrapperElement?.getBoundingClientRect().left ?? 0) + 8}px`
      : undefined,
  } satisfies CSSProperties
})

const settingsComponent = computed(() => {
  switch (currentBlock.value?.element.type) {
    case "table":
      return SettingsTable
    default:
      return null
  }
})

watch(
  () => props.wrapperElement,
  (wrapper) => {
    if (!wrapper) return

    caretPosition.value = new CaretPosition({ target: wrapper, keepLast: true })

    wrapper.addEventListener("blur", () => {
      show.value = false
    })
    wrapper.addEventListener("focus", () => {
      show.value = true
    })

    caretPosition.value.addEventListener("update", (rect) => {
      if (!props.editor) return

      const selection = props.editor.selection
      if (!selection) return

      const currentNode = Array.from(
        Editor.nodes(props.editor, {
          at: selection,
          mode: "highest",
          match: (n) => !Editor.isEditor(n),
        }),
      )[0]
      if (currentNode) {
        const currentNodePath = [currentNode[1][0]!]
        const rootNode = Editor.node(
          props.editor,
          currentNodePath,
        ) as NodeEntry<SlateElement<any>>
        const isEmpty =
          rootNode[0].type === "p" && Editor.isEmpty(props.editor, rootNode[0])
        currentBlock.value = {
          element: rootNode[0],
          path: currentNodePath,
          isEmpty,
        }
      }
    })
  },
)

const creatingBlocks = [
  "p",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "blockquote",
  "code",
  "img",
  "table",
] as const

function getElementName(type: string) {
  const dict = {
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
    h4: "Heading 4",
    h5: "Heading 5",
    h6: "Heading 6",
    p: "Paragraph",
    ul: "Unordered List",
    ol: "Ordered List",
    li: "List Item",
    blockquote: "Quote",
    code: "Code",
    img: "Image",
    table: "Table",
    tr: "Table Row",
    td: "Table Cell",
    th: "Table Header",
  }
  return dict[type as keyof typeof dict]
}

function getElementIcon(type: string) {
  const dict = {
    h1: "format_h1",
    h2: "format_h2",
    h3: "format_h3",
    h4: "format_h4",
    h5: "format_h5",
    h6: "format_h6",
    p: "format_paragraph",
    ul: "format_list_bulleted",
    ol: "format_list_numbered",
    li: "li",
    blockquote: "format_quote",
    code: "code",
    img: "image",
    table: "table",
    tr: "table_rows",
    td: "tablet",
    th: "tablet",
  }
  return dict[type as keyof typeof dict]
}

function move(dir: "up" | "down") {
  if (!currentBlock.value) return

  Transforms.moveNodes(props.editor!, {
    at: currentBlock.value.path,
    to:
      dir === "up"
        ? Path.previous(currentBlock.value.path)
        : Path.next(currentBlock.value.path),
  })

  caretPosition.value?.updateRect()
}

function remove() {
  if (!currentBlock.value) return

  Transforms.removeNodes(props.editor!, {
    at: currentBlock.value.path,
  })

  currentBlock.value = null

  caretPosition.value?.updateRect()
}

function insert(type: (typeof creatingBlocks)[number]) {
  const block = props.editor?.blocks.find(
    (b: SlateBlock<string, any>) => b.id === type,
  )

  if (block) {
    const element = JSON.parse(JSON.stringify(block.emptyBlock))
    const prevPath = currentBlock.value?.path ?? [0]
    Transforms.insertNodes(props.editor!, element, {
      at: prevPath,
    })
    Transforms.select(props.editor!, {
      anchor: {
        path: prevPath,
        offset: 0,
      },
      focus: {
        path: prevPath,
        offset: 0,
      },
    })
    Transforms.removeNodes(props.editor!, {
      at: Path.next(prevPath),
    })
  }

  caretPosition.value?.updateRect()
}
</script>

<template>
  <v-menu placement="bottom-start" :close-on-content-click="false" fullHeight>
    <template #activator="{ toggle }">
      <v-button
        ref="buttonRef"
        class="settings-button"
        :style="styles"
        xSmall
        secondary
        icon
        @click="toggle"
      >
        <v-icon
          :name="
            currentBlock?.isEmpty
              ? 'add'
              : getElementIcon(currentBlock?.element.type ?? 'p')
          "
        />
      </v-button>
    </template>
    <v-list v-if="currentBlock && !currentBlock.isEmpty">
      <v-list-item>
        {{
          currentBlock
            ? getElementName(currentBlock.element.type)
            : "Unknown Block"
        }}
      </v-list-item>
      <div
        v-if="settingsComponent && editor && currentBlock"
        class="extra-settings"
      >
        <component
          :is="settingsComponent"
          :editor="props.editor!"
          :element="currentBlock.element as any"
          :path="currentBlock.path"
        />
      </div>
      <hr class="menu-separator" />
      <v-list-item clickable @click="move('up')">
        <v-list-item-icon>
          <v-icon name="arrow_upward" />
        </v-list-item-icon>
        <v-list-item-content>Move up</v-list-item-content>
      </v-list-item>
      <v-list-item clickable @click="move('down')">
        <v-list-item-icon>
          <v-icon name="arrow_downward" />
        </v-list-item-icon>
        <v-list-item-content>Move down</v-list-item-content>
      </v-list-item>
      <v-list-item clickable @click="remove()">
        <v-list-item-icon><v-icon name="backspace" /></v-list-item-icon>
        <v-list-item-content>Remove</v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="!currentBlock || currentBlock?.isEmpty">
      <v-list-item
        v-for="type in creatingBlocks"
        clickable
        @click="insert(type)"
      >
        <v-list-item-icon>
          <v-icon :name="getElementIcon(type)" />
        </v-list-item-icon>
        <v-list-item-content>
          {{ getElementName(type) }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.settings-button {
  z-index: 1;
  position: fixed;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 200ms;
  transform: translate(0, -50%);
}

.extra-settings {
  --theme--form--field--input--padding: 4px;
  --theme--form--field--input--height: 32px;
  padding: 0.5rem;
}

.menu-separator {
  margin: 0.5rem 0;
  background-color: var(--theme--border-color);
  border: none;
  height: 1px;
}
</style>
