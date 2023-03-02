<template>
  <div class="flex">
    <DefaultContainer title="Event information" class="flex-grow">
      <BaseSection>
        <TableList :data="{
          'Code': 'MTM2023',
          'Name': 'Meet the Merchant 2023',
          'Registrations': 8
        }" />
        <div class="flex gap-4">
          <ButtonBase icon="mdi:eye">
            View page
          </ButtonBase>
          <ButtonBase icon="mdi:email" class="hidden">
            Mail campaigns
          </ButtonBase>
          <ButtonBase icon="mdi:pencil">
            Edit
          </ButtonBase>
          <ButtonBase icon="mdi:delete">
            Delete
          </ButtonBase>
        </div>
      </BaseSection>
    </DefaultContainer>
    <DefaultContainer title="Registrations" class="flex-grow">
      <BaseSection>
        <TableBase>
          <TableRow>
            <TableHead>
              Company name
            </TableHead>
            <TableHead>
              Name
            </TableHead>
            <TableHead>
              Email
            </TableHead>
            <TableHead>
            </TableHead>
          </TableRow>
          <TableRow v-for="i in 5">
            <TableData>
              John Corp
            </TableData>
            <TableData>
              John Doe
            </TableData>
            <TableData>
              john@doe.com
            </TableData>
            <TableData>
              <ButtonBase>
                View
              </ButtonBase>
            </TableData>
          </TableRow>
        </TableBase>
        <ButtonBase>
          Load more
        </ButtonBase>
      </BaseSection>
    </DefaultContainer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin"
})
</script>