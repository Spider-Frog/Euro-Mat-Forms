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
        <TableRow v-for="i in 10">
          <TableData>
            MTM2023
          </TableData>
          <TableData>
            Meet the Merchant 2023
          </TableData>
          <TableData>
            23
          </TableData>
          <TableData>
            <ButtonLink to="/admin/event/MTM2023">
              View
            </ButtonLink>
          </TableData>
        </TableRow>
      </TableBase>
    </DefaultContainer>
    <DefaultContainer title="Test" class="flex-grow">
      Test
    </DefaultContainer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin"
})
</script>