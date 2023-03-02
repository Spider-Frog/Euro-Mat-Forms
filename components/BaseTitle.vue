<template>
  <h1 v-if="size === '1'" class="text-gold-500 text-4xl font-bold"><slot /></h1>
  <h2 v-else-if="size === '2'" class="text-gold-500 text-3xl font-bold"><slot /></h2>
  <h3 v-else-if="size === '3'" class="text-gold-500 text-2xl font-bold"><slot /></h3>
  <h4 v-else-if="size === '4'" class="text-gold-500 text-lg font-bold"><slot /></h4>
  <h5 v-else-if="size === '5'" class="text-gold-500 text-lg font-bold"><slot /></h5>
  <h6 v-else class="text-gold-500 text-sm font-bold"><slot /></h6>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: '1'
  }
})
</script>