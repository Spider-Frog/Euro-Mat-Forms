<template>
  <form>
    <div>
      <Title size="2">Program information</Title>
      <p>
        Choose which person participates to a specific event.
      </p>
      <FormKit
          type="form"
          submit-label="Next step"
          @submit="$emit('update:modelValue', program); $emit('submit')"
      >
        <FormKit
            type="checkbox"
            label="Lunch"
            :options="participants_users"
            v-model="program.lunch"
        />
        <FormKit
            type="checkbox"
            label="Dinner"
            :options="participants_users"
            v-model="program.dinner"
        />
      </FormKit>
    </div>
  </form>
</template>

<script setup>
const props = defineProps(['modelValue', 'participants'])
defineEmits(['update:modelValue', 'submit'])

const participants_users = computed(() => {
  const output = {}

  if (!props.participants) {
    return {}
  }

  for (let [key, value] of Object.entries(props.participants)) {
    output[value.email] = `${value.first_name} ${value.last_name}`
  }

  return output
})

const program = useState('programInfoForm', () => {
  return {
    lunch: [],
    dinner: []
  }
})
</script>
