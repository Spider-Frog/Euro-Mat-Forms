<template>
  <RouterLink :to="to">
    <ButtonBase :icon="icon">
      <slot />
    </ButtonBase>
  </RouterLink>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: [String, Object],
    required: true
  },
  icon: String
})
</script>