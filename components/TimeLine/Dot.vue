<template>
  <div :class="{
    'w-12 h-12 rounded-full border-2 bg-neutral-200 border-neutral-300': true,
    'bg-neutral-400 border-neutral-500': checked
  }">
    <div class="w-full h-full flex justify-center items-center">
      <b>{{ number }}</b>
    </div>
    <span :class="{
      'relative top-2 text-center w-fit block -translate-x-1/4': true,
      'font-bold': checked
    }">
      <slot />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  checked: {
    type: Boolean,
    default: false
  },
  number: {
    type: String,
    required: true
  }
})
</script>
