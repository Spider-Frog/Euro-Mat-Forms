<template>
  <div class="w-full h-2 top-7 relative bg-neutral-300">
    <div class="h-2 bg-neutral-500 transition-all duration-500" :style="{width: fill + '%'}">

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fill: {
    type: Number,
    required: true
  }
})
</script>