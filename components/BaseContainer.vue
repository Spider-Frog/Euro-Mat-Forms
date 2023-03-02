<template>
  <div class="container bg-white border-2 border-solid border-slate-300 p-8">
    <BaseTitle v-if="title" size="1">{{ title }}</BaseTitle>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String
})
</script>

<style>
/*div.container > * {*/
/*  margin-bottom: 1rem;*/
/*}*/

/*div.container > *:last-child {*/
/*  margin-bottom: 0;*/
/*}*/
</style>