<template>
  <section class="last:border-0 border-b-2 border-solid border-slate-300 py-4 last:pb-0">
    <BaseTitle v-if="title" size="2">{{ title }}</BaseTitle>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<style>
section > * {
  margin-bottom: 1rem;
}

section > *:last-child {
  margin-bottom: 0;
}
</style>