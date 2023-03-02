<template>
  <BaseContainer :title="title" class="m-4">
    <slot />
  </BaseContainer>
</template>

<script setup lang="ts">
defineProps({
  title: String
})
</script>