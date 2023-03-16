<template>
  <div class="flex">
    <DefaultContainer title="Events" class="flex-grow">
      <TableBase>
        <TableRow>
          <TableHead>
            Code
          </TableHead>
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            Registrations
          </TableHead>
          <TableHead>

          </TableHead>
        </TableRow>
      </TableBase>
    </DefaultContainer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin"
})
</script>