<script setup lang="ts">
import { Transforms } from "slate"
import { computed } from "vue"
import { ImageBlock, imageSelectionPath } from "./image"

import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<ImageBlock>, "children">>()

const url = computed(() => {
  const isIdSrc = ImageBlock.hasIdSource(props.element)
  return isIdSrc ? `/assets/${props.element.src}` : props.element.src ?? ""
})

function open() {
  imageSelectionPath.value = props.path
}

function select() {
  Transforms.select(props.editor, [...props.path, 0])
}
</script>

<template>
  <div class="image-block" v-bind="attributes">
    <div class="image-wrapper" v-if="element.src" @click="select">
      <img class="image" :src="url" :alt="element.caption" />
    </div>
    <div class="image-wrapper" v-else>
      <button class="button" @click="open">Add image</button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.image-block {
  display: flex;
}

.image-wrapper {
  width: 100%;
  padding: 0.5rem;
  border-radius: var(--theme--border-radius);
  border: 1px dashed var(--theme--form--field--input--border-color);
}

.image {
  width: 100%;
  height: auto;
}

.button {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--v-button-height);
  padding: 0 20px;
  color: var(--theme-foreground);
  font-weight: var(--v-button-font-weight);
  font-size: var(--v-button-font-size);
  line-height: var(--v-button-line-height);
  text-decoration: none;
  background-color: var(--background-normal);
  border: var(--theme--border-width) solid var(--background-normal);
  border-radius: var(--theme--border-radius);
  cursor: pointer;
  transition: var(--fast) var(--transition);
  text-align: center;
  justify-content: center;
}
</style>
