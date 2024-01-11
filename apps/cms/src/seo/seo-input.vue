<script setup lang="ts">
import { useStores } from "@directus/extensions-sdk"
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue"
import { findParentNodeWithName } from "../shared/utils/vue"

interface Seo {
  title: string | null
  description: string | null
}

const props = withDefaults(
  defineProps<{
    value: Seo | null
    disabled?: boolean
    titleField?: string
    descriptionField?: string
    slugField?: string
    separator: string
  }>(),
  {
    separator: "|",
  },
)

const emit = defineEmits(["input"])

const { useSettingsStore } = useStores()
const settingsStore = useSettingsStore()

const instance = getCurrentInstance()
const settings = settingsStore.settings
const favicon = ref(`${location.origin}/assets/${settings.public_favicon}`)
const titleInputRef = ref<HTMLInputElement | null>(null)
const descriptionInputRef = ref<HTMLTextAreaElement | null>(null)
const form = ref(findParentNodeWithName(instance, "v-form"))

const currentTitle = computed(() => {
  if (!props.titleField || !form.value?.props) return null
  const initialValues = form.value.props.initialValues as
    | Record<string, any>
    | undefined
  const modelValue = form.value.props.modelValue as
    | Record<string, any>
    | undefined
  const initialTitle = initialValues?.[props.titleField]
  const editedTitle = modelValue?.[props.titleField]
  return editedTitle || initialTitle || ""
})

const currentDescription = computed<string>(() => {
  if (!props.descriptionField || !form.value?.props) return null
  const initialValues = form.value.props.initialValues as
    | Record<string, any>
    | undefined
  const modelValue = form.value.props.modelValue as
    | Record<string, any>
    | undefined
  const initialDescription = initialValues?.[props.descriptionField]
  const editedDescription = modelValue?.[props.descriptionField]
  return editedDescription || initialDescription || ""
})

const currentSlug = computed<string>(() => {
  if (!props.slugField || !form.value?.props) return null
  const initialValues = form.value.props.initialValues as
    | Record<string, any>
    | undefined
  const modelValue = form.value.props.modelValue as
    | Record<string, any>
    | undefined
  const initialDescription = initialValues?.[props.slugField]
  const editedDescription = modelValue?.[props.slugField]
  return editedDescription || initialDescription
})

onMounted(() => {
  resizeTitleInput()
  resizeDescriptionInput()
})

watch(
  () => currentTitle.value,
  (title) => {
    if (!titleInputRef.value) return
    titleInputRef.value.value = title

    setTimeout(() => {
      resizeTitleInput()
    }, 10)
  },
)

watch(
  () => currentDescription.value,
  (description) => {
    if (!descriptionInputRef.value) return
    descriptionInputRef.value.value = description

    setTimeout(() => {
      resizeDescriptionInput()
    }, 10)
  },
)

watch(
  () => titleInputRef.value,
  (input) => {
    if (!input) return

    input.addEventListener("change", resizeTitleInput)
    input.addEventListener("input", resizeTitleInput)
  },
)

watch(
  () => descriptionInputRef.value,
  (input) => {
    if (!input) return

    input.addEventListener("change", resizeDescriptionInput)
    input.addEventListener("input", resizeDescriptionInput)
  },
)

function resizeTitleInput() {
  const input = titleInputRef.value
  if (!input) return
  input.style.width = "0"
  input.style.width = `${input.scrollWidth}px`
}

function resizeDescriptionInput() {
  const input = descriptionInputRef.value
  if (!input) return
  input.style.height = "0"
  input.style.height = `${input.scrollHeight}px`
}

function updateSeo(field: keyof Seo, newValue: string) {
  const seo = {
    ...(props.value || {}),
    [field]: newValue || null,
  }
  emit("input", seo)
}
</script>

<template>
  <div class="interface-seo">
    <div class="interface-seo-head">
      <img class="interface-seo-favicon" :src="favicon" alt="" />
      <div class="interface-seo-site">
        <p class="interface-seo-siteName">{{ settings.project_name }}</p>
        <p class="interface-seo-url">
          {{ settings.project_url }} › {{ currentSlug }}
        </p>
      </div>
    </div>
    <div class="interface-seo-content">
      <p hidden>{{ currentTitle }}</p>
      <p hidden>{{ currentDescription }}</p>
      <div class="interface-seo-title">
        <input
          ref="titleInputRef"
          class="interface-seo-input"
          @input="
            updateSeo('title', ($event.target as HTMLInputElement).value ?? '')
          "
        />
        <p style="white-space: nowrap">
          {{ separator }} {{ settings.project_name }}
        </p>
      </div>
      <textarea
        ref="descriptionInputRef"
        class="interface-seo-input interface-seo-description"
        @input="
          updateSeo(
            'description',
            ($event.target as HTMLInputElement).value ?? '',
          )
        "
      />
    </div>
  </div>
</template>

<style scoped>
.interface-seo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: var(--theme--border-width) solid
    var(--theme--form--field--input--border-color);
  border-radius: var(--theme--border-radius);
}

.interface-seo-head,
.interface-seo-content {
  max-width: 600px;
}

.interface-seo-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.interface-seo-site {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}

.interface-seo-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.interface-seo-favicon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
}

.interface-seo-input {
  border: none;
  background-color: transparent;
  padding: 0;
}

.interface-seo-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  color: #8ab4f8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.interface-seo-description {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  min-height: 1.5em;
  margin: 0;
  resize: none;
}

.interface-seo-siteName {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
}

.interface-seo-url {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
}
</style>
