<template>
  <h1 v-if="size === '1'" class="text-gold-500 text-4xl bold"><slot /></h1>
  <h2 v-else-if="size === '2'" class="text-gold-500 text-3xl bold"><slot /></h2>
  <h3 v-else-if="size === '3'" class="text-gold-500 text-2xl bold"><slot /></h3>
  <h4 v-else-if="size === '4'" class="text-gold-500 text-lg bold"><slot /></h4>
  <h5 v-else-if="size === '5'" class="text-gold-500 text-lg bold"><slot /></h5>
  <h6 v-else class="text-gold-500 text-sm bold"><slot /></h6>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 1
  }
})
</script>