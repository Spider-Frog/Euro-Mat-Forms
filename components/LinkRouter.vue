<template>
  <RouterLink :to="to" class="hover:underline cursor-pointer">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: [String, Object],
    required: true
  }
})
</script>

<style scoped>

</style>