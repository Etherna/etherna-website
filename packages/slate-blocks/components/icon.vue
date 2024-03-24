<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <i class="icon" :data-icon="name" />
</template>

<style scoped>
.icon {
  display: block;
  font-family: Material Symbols;
  font-weight: 400;
  font-size: var(--v-icon-size, 1.1em);
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
.icon::after {
  content: attr(data-icon);
}
</style>
