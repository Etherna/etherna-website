<script setup lang="ts">
import { useApi } from "@directus/extensions-sdk"
import { getElementAtPath } from "@mattiaz9/slate-jsx"
import { Transforms } from "slate"
import { computed, onMounted, ref, watch } from "vue"
import blockLinkEditor from "../../shared/components/block-link-editor.vue"
import { getElementExtraSettings } from "../utils"
import { settingsElement } from "./ui-block"

import type { BlockEditor } from "@mattiaz9/slate-jsx"
import type { CSSProperties } from "vue"

const api = useApi()

const props = defineProps<{
  editor: BlockEditor<any, any>
  linkCollections?: string[]
}>()

const marks = ref<Record<string, any>>({})
const modalPosition = ref<CSSProperties | undefined>(undefined)

const settings = computed(() => {
  return getElementExtraSettings(settingsElement.value?.element.type)
})

onMounted(() => {
  document.getElementById("main-content")?.addEventListener(
    "scroll",
    (e) => {
      updatePosition()
    },
    {
      passive: true,
    },
  )
})

watch(
  () => settingsElement.value?.element,
  () => {
    marks.value = {}

    if (!settingsElement.value?.element) {
      modalPosition.value = undefined
      return
    }

    const { children, type, ...props } = settingsElement.value.element

    marks.value = { ...props }

    updatePosition()
  },
)

function updatePosition() {
  if (!settingsElement.value?.element) return

  if (settingsElement.value.path) {
    const htmlElement = getElementAtPath(
      settingsElement.value.path!,
      props.editor.element,
    )

    const rect = htmlElement.getBoundingClientRect()

    modalPosition.value = {
      left: `${rect.left + rect.width / 2}px`,
      top: `${rect.top + 6}px`,
    }
  } else {
    modalPosition.value = {
      top: "50%",
      left: "50%",
    }
  }
}

function updateValue(id: string, value: any) {
  marks.value = {
    ...marks.value,
    [id]: value,
  }

  if (value === undefined) {
    delete marks.value[id]
  }

  Transforms.setNodes(props.editor, marks.value, {
    at: settingsElement.value?.path,
  })
}
</script>

<template>
  <div
    :class="{ 'block-extra-settings': true, open: !!modalPosition }"
    :style="modalPosition"
  >
    <v-card class="extra-settings-card">
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <div class="block-extra-settings-form">
          <div v-for="setting in settings" :key="setting.id">
            <label for="">{{ setting.name }}</label>

            <v-input
              v-if="setting.type === 'string'"
              :value="marks[setting.id]"
              @input="updateValue(setting.id, $event.target.value)"
              type="text"
            />

            <v-input
              v-if="setting.type === 'number'"
              :value="marks[setting.id]"
              @input="updateValue(setting.id, $event.target.value)"
              type="number"
            />

            <interface-select-color
              v-if="setting.type === 'color'"
              width="full"
              :value="marks[setting.id] ?? ''"
              @input="updateValue(setting.id, $event)"
            />

            <v-checkbox
              v-if="setting.type === 'boolean'"
              :value="marks[setting.id]"
              @input="updateValue(setting.id, $event.target.checked)"
            />

            <block-link-editor
              v-if="setting.type === 'link'"
              :to="marks.to"
              :href="marks.href"
              :target="marks.target"
              :linkCollections="linkCollections"
              :api="api"
              @update:to="updateValue('to', $event)"
              @update:href="updateValue('href', $event)"
              @update:target="updateValue('target', $event)"
            />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-button secondary @click="settingsElement = undefined" small>
          Done
        </v-button>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.block-extra-settings {
  position: fixed;
  z-index: 100;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  transform: translate(-50%, -100%);
}

.block-extra-settings.open {
  display: block;
  visibility: visible;
  opacity: 1;
  pointer-events: all;
}

.extra-settings-card {
  width: 400px;
  max-width: 100%;
}

.block-extra-settings-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
