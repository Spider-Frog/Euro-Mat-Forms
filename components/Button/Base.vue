<template>
  <button class="bg-gray-200 border-2 border-solid border-gray-300 hover:bg-gray-400 hover:border-gray-500 py-2 px-4">
    <Icon v-if="icon" :name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  icon: String
})
</script>