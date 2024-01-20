<script setup lang="ts">
import { Transforms } from "slate"

import Icon from "../../components/icon.vue"

import type { ListOfBlock } from "."
import type { RenderElementProps } from "@mattiaz9/slate-jsx"

const props = defineProps<Omit<RenderElementProps<ListOfBlock>, "children">>()

function addBlock() {
  const { editor, path, element } = props
  const addPath = [...path, element.children.length]

  const block = props.block.options.layout?.[0]?.block

  if (block) {
    Transforms.insertNodes(editor, block.emptyBlock, { at: addPath })
  }
}
</script>

<template>
  <div class="cta-list-block" v-bind="attributes">
    <slot />

    <button
      class="cta-list-block-add"
      @click="addBlock"
      contenteditable="false"
    >
      <Icon name="add" />
    </button>
  </div>
</template>

<style scoped>
.cta-list-block {
  display: flex;
  gap: 1rem;
}

.cta-list-block-add {
  padding: 0.5rem;
  background-color: var(--background-subdued);
  border-radius: 0.5rem;
}
</style>
