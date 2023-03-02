<template>
  <div class="bg-neutral-800 min-h-screen p-2 md:p-8">
    <div class="bg-white md:w-3/4 m-auto border-2 border-solid border-slate-300 p-8">
      <header class="border-b-2 border-solid border-slate-300 p-4">
        <img class="w-full lg:w-1/2 m-auto" src="/logo.jpg">
        <p class="pt-4 text-right">
          Logged in as <LinkRouter to="/admin">John Doe</LinkRouter>
        </p>
      </header>
      <main>
        <slot />
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">

import TheFooter from "~/components/TheFooter.vue";
</script>

<style scoped>

</style>