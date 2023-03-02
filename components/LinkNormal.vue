<template>
  <a :href="href" :target="target" class="hover:underline cursor-pointer">
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true
  },
  target: String
})
</script>

<style scoped>

</style>