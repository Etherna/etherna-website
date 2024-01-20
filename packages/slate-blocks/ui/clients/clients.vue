<script setup lang="ts">
import { ref } from "vue"

import BlockAdder from "../../components/block-adder.vue"
import BlockSettings from "../../components/block-settings.vue"
import { fixedSvgImport } from "../../utils/vue"
import previewDefault from "./preview-default.svg"

import type { ClientsBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<ClientsBlock>, "children">>()

const variants = ref([
  {
    id: "default",
    name: "Default",
    preview: fixedSvgImport(previewDefault),
  },
])
</script>

<template>
  <div
    :class="{
      'clients-block': true,
      [`variant-${element.variant ?? 'default'}`]: true,
    }"
    v-bind="attributes"
  >
    <div class="settings">
      <block-adder :editor="props.editor" :path="props.path" />
      <block-settings
        name="Clients"
        :editor="props.editor"
        :element="props.element"
        :path="props.path"
        :variant="props.element.variant ?? 'default'"
        :variants="variants"
      />
    </div>
    <div class="clients-block-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.clients-block {
  position: relative;
  border-radius: calc(var(--theme--border-radius) * 2);
}
.clients-block.variant-default > .clients-block-content {
  grid-template-areas:
    "heading"
    "clients";
  padding: 2rem;
  background-color: var(--background-subdued);
  border-radius: 1rem;
}

.clients-block-content {
  margin-top: 1rem;
  display: grid;
  gap: 2rem;
  flex-wrap: wrap;
}

:global(.clients-block > .clients-block-content > [data-section-id="heading"]) {
  grid-area: heading;
}
:global(
    .clients-block > .clients-block-content > [data-section-id="heading"] h2
  ) {
  font-size: 1.25rem !important;
}
:global(.clients-block > .clients-block-content > [data-section-id="clients"]) {
  grid-area: clients;
}
</style>
