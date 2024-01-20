<script setup lang="ts">
import { Path, Transforms } from "slate"
import { ref } from "vue"

import { settingsElement } from "../ui/ui-block"
import { svgStringToHtmlElement } from "../utils/vue"
import icon from "./icon.vue"

import type { SlateElement } from "@mattiaz9/slate-jsx"
import type { BaseEditor } from "slate"

const props = defineProps<{
  editor: BaseEditor
  name: string
  variant: string
  variants: { id: string; name: string; preview: string }[]
  element: SlateElement<any, any>
  path: Path
  hasExtraSettings?: boolean
}>()

const open = ref(false)

function changeVariant(id: string) {
  Transforms.setNodes<any>(props.editor, { variant: id }, { at: props.path })
}

function move(dir: "up" | "down") {
  Transforms.moveNodes(props.editor!, {
    at: props.path,
    to: dir === "up" ? Path.previous(props.path) : Path.next(props.path),
  })
}

function del() {
  Transforms.removeNodes(props.editor!, {
    at: props.path,
  })
}

function showSettings() {
  settingsElement.value = {
    element: props.element,
    path: props.path,
  }
  open.value = false
}
</script>

<template>
  <div class="block-settings" contenteditable="false">
    <div class="block-dropdown">
      <button class="block-dropdown-trigger" @click="open = !open">
        {{ name }}
      </button>
      <div :class="{ 'block-dropdown-menu': true, open: open }">
        <div class="block-dropdown-variants">
          <button
            v-for="variant in variants"
            :key="variant.id"
            :class="{
              'block-dropdown-variant-item': true,
              active: variant.id === props.variant,
            }"
            @click="changeVariant(variant.id)"
          >
            <span
              class="preview"
              v-html="svgStringToHtmlElement(variant.preview)"
            />
            {{ variant.name }}
          </button>
        </div>
        <hr v-if="hasExtraSettings" class="block-dropdown-divider" />
        <button
          v-if="hasExtraSettings"
          class="block-dropdown-item"
          @click="showSettings()"
        >
          <icon name="settings" />
          Settings
        </button>
        <slot />
        <hr v-if="hasExtraSettings" class="block-dropdown-divider" />
        <button class="block-dropdown-item" @click="move('up')">
          <icon name="arrow_upward" />
          Move up
        </button>
        <button class="block-dropdown-item" @click="move('down')">
          <icon name="arrow_downward" />
          Move down
        </button>
        <button class="block-dropdown-item delete" @click="del()">
          <icon name="delete" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block-settings {
  position: relative;
}

.block-dropdown {
  display: inline-block;
}

.block-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  border-radius: calc(var(--theme--border-radius));
  background: var(--theme--navigation--background);
  color: var(--theme--foreground);
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
}

.block-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 4px;
  padding: 0.5rem 0;
  min-width: 200px;
  border-radius: var(--theme--border-radius);
  background: var(--theme--navigation--background);
  color: var(--theme--color-primary-contrast);
  font-weight: 500;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}
.block-dropdown-menu.open {
  opacity: 1;
  pointer-events: all;
}

.block-dropdown-variants {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
}
.block-dropdown-variant-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
}
.block-dropdown-variant-item > .preview {
  width: 106px;
  height: auto;
  display: flex;
  border: 2px solid var(--theme--background);
  border-radius: var(--theme--border-radius);
  transition: border-color 0.2s ease-in-out;
}
.block-dropdown-variant-item > .preview > svg {
  width: 100%;
}
.block-dropdown-variant-item.active > .preview,
.block-dropdown-variant-item:hover > .preview {
  border-color: var(--project-color);
}

.block-dropdown-divider {
  margin: 0.15rem 0;
  border: none;
  border-top: 1px solid var(--background-subdued);
}

.block-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  background: var(--theme--navigation--background);
  color: var(--theme--foreground);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}
.block-dropdown-item:hover {
  background: var(--background-subdued);
}
.block-dropdown-item.delete {
  color: var(--theme--danger);
}
</style>
