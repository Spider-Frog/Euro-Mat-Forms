<template>
  <TableBase>
    <TableRow v-for="(item, key) in data">
      <TableHead>
        {{ key }}
      </TableHead>
      <TableData>
        {{ item }}
      </TableData>
    </TableRow>
  </TableBase>
</template>

<script setup lang="ts">
defineProps<{
  data: {[key: string]: string | number | null}
}>()
</script>