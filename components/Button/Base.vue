<template>
  <button :class="{'border-2 border-solid py-2 px-4': true, 'bg-gray-200 border-gray-300 hover:bg-gray-400 hover:border-gray-500': color}">
    <Icon v-if="icon" :name="icon" class="mr-1" />
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  color: {
    type: Boolean,
    default: true
  }
})
</script>