<script setup lang="ts">
import { ref } from "vue"

import BlockAdder from "../../components/block-adder.vue"
import BlockSettings from "../../components/block-settings.vue"
import { fixedSvgImport } from "../../utils/vue"
import previewDefault from "./preview-default.svg"
import previewImageRight from "./preview-image-right.svg"

import type { HeroBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<RenderElementProps<HeroBlock>>()

const variants = ref([
  {
    id: "default",
    name: "Default",
    preview: fixedSvgImport(previewDefault),
  },
  {
    id: "image-right",
    name: "Image right",
    preview: fixedSvgImport(previewImageRight),
  },
])
</script>

<template>
  <div
    :class="{
      'hero-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    v-bind="attributes"
  >
    <div class="settings">
      <block-adder :editor="props.editor" :path="props.path" />
      <block-settings
        name="Hero"
        :editor="props.editor"
        :element="props.element"
        :path="props.path"
        :variant="props.element.variant ?? 'default'"
        :variants="variants"
      />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.hero-block {
  position: relative;
  display: grid;
  gap: 2rem;
  border-radius: calc(var(--theme--border-radius) * 2);
}

.hero-block.variant-default {
  grid-template-areas:
    "settings"
    "title"
    "text"
    "cta"
    "image";
}
.hero-block.variant-image-right {
  grid-template-areas:
    "settings" "settings" "settings" "settings"
    "title title title image"
    "text text text image"
    "cta cta cta image";
}

.settings {
  grid-area: settings;
}

:global(.hero-block > [data-section-id="title"]) {
  grid-area: title;
}
:global(.hero-block > [data-section-id="text"]) {
  grid-area: text;
}
:global(.hero-block > [data-section-id="cta"]) {
  grid-area: cta;
}
:global(.hero-block > [data-section-id="image"]) {
  grid-area: image;
}

:global(.hero-block.variant-default [data-slate-element="h1"]) {
  text-align: center;
}
:global(.hero-block.variant-default [data-slate-element="p"]) {
  text-align: center;
}

:global(.hero-block.variant-image-right [data-slate-element="h1"]) {
  text-align: left;
}
:global(.hero-block.variant-image-right [data-slate-element="p"]) {
  text-align: left;
}
</style>
