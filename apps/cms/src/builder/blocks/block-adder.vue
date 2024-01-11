<script setup lang="ts">
import { computed, ref } from "vue"
import { fixedSvgImport, svgStringToHtmlElement } from "../../shared/utils/vue"
import { CardBlock } from "./card"
import cardPreview from "./card/preview-default.svg"
import { ClientsBlock } from "./clients"
import clientsPreview from "./clients/preview-default.svg"
import { FeaturesBlock } from "./features"
import featuresPreview from "./features/preview-default.svg"
import { HeroBlock } from "./hero"
import heroPreview from "./hero/preview-default.svg"
import icon from "./icon.vue"
import { UiBlock } from "./ui-block"

import type { BaseEditor, Path } from "slate"

interface BlockType {
  id: string
  name: string
  preview: string
  block: UiBlock<any, any>
}

const props = defineProps<{
  editor: BaseEditor
  path: Path
}>()

const open = ref(false)
const filter = ref("")
const filterInput = ref<HTMLInputElement | null>(null)
const blocks = ref<BlockType[]>([
  {
    id: "hero",
    name: "Hero",
    block: new HeroBlock(),
    preview: fixedSvgImport(heroPreview),
  },
  {
    id: "clients",
    name: "Clients",
    block: new ClientsBlock(),
    preview: fixedSvgImport(clientsPreview),
  },
  {
    id: "card",
    name: "Card",
    block: new CardBlock(),
    preview: fixedSvgImport(cardPreview),
  },
  {
    id: "features",
    name: "Features",
    block: new FeaturesBlock(),
    preview: fixedSvgImport(featuresPreview),
  },
])
const filteredBlocks = computed(() =>
  blocks.value.filter((block) =>
    block.name.toLowerCase().includes(filter.value.toLowerCase()),
  ),
)

function toggleMenu() {
  open.value = !open.value

  if (open.value) {
    setTimeout(() => {
      filterInput.value?.focus()
    }, 100)
  }
}

function inputHandler(event: Event) {
  console.log(event)
  filter.value = (event.target as HTMLInputElement).value
}

function insertBlock(id: string) {
  const { editor, path } = props

  const block = blocks.value.find((block) => block.id === id)!
  const element = JSON.parse(JSON.stringify(block.block.emptyBlock))

  editor.insertNode(element, {
    at: path,
  })

  toggleMenu()
}
</script>

<template>
  <div class="adder-dropdown" contenteditable="false">
    <button class="adder-dropdown-trigger" @click="toggleMenu">
      <icon name="add_circle" />
    </button>
    <div :class="{ 'adder-dropdown-content': true, open }">
      <input
        ref="filterInput"
        class="adder-filter"
        type="text"
        placeholder="Find blocks..."
        @input="inputHandler"
        autofocus
      />
      <ul class="adder-grid">
        <li
          v-for="block in filteredBlocks"
          class="adder-item"
          :key="block.id"
          @click="insertBlock(block.id)"
        >
          <span
            class="preview"
            v-html="svgStringToHtmlElement(block.preview)"
          />
          <span>{{ block.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.adder-dropdown {
  width: 100%;
  position: relative;
  display: block;
  margin: 1rem 0;
}

.adder-dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--theme--foreground);
  opacity: 0.25;
  transition: opacity 200ms;
  font-size: 1.5rem;
  user-select: none;
}
.adder-dropdown-trigger::before,
.adder-dropdown-trigger::after {
  content: "";
  display: block;
  height: 2px;
  flex: 1 1 0%;
  background-color: currentColor;
}
.adder-dropdown-trigger:hover {
  opacity: 1;
}

.adder-dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 1rem;
  z-index: 10;
  border-radius: var(--theme--border-radius);
  background-color: var(--theme--navigation--background);
  color: var(--theme--foreground);
  transition: opacity 200ms;
  opacity: 0;
  pointer-events: none;
}
.adder-dropdown-content.open {
  opacity: 1;
  pointer-events: auto;
}

.adder-filter {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border-radius: var(--theme--border-radius);
  border: 1px solid var(--theme--background);
}
.adder-filter:focus {
  outline: none;
  border-color: var(--theme--primary);
}

.adder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
  list-style: none;
  padding-left: 0;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  margin-top: 1.5rem;
}

.adder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: var(--theme--border-radius);
  transition: background-color 200ms ease-in-out;
  color: var(--theme--foreground);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
}
.adder-item:hover {
  background-color: var(--theme--background);
}

.adder-item > .preview {
  width: 100%;
  height: auto;
  display: flex;
}
.adder-item > .preview > svg {
  width: 100%;
}
</style>
