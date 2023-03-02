<template>
  <form>
    <BaseTitle size="2">General Information</BaseTitle>
    <FormKit
      type="form"
      submit-label="Next step"
      @submit="submit()"
    >
      <FormKit
          v-model="form.participate"
          type="radio"
          :options="{
            '1': 'I will participate',
            '0': 'I will not participate'
          }"
          validation="required"
          :validation-messages="{
            required: 'Please fill in this option.',
          }"
      />
      <FormKit
          v-model="form.email"
          type="email"
          label="E-mail"
          validation="required|email"
      />
      <FormKit
          v-model="form.companyName"
          type="text"
          label="Company Name"
          validation="required"
      />
      <FormKit
          v-model="form.note"
          type="textarea"
          label="Note"
      />
    </FormKit>
  </form>
</template>

<script setup lang="ts">
import {GeneralInfo} from "~/schema/GeneralInfo";

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'submit'])

const form = useState('generalInfoForm', () => {
  return {
    participate: "1",
    companyName: "",
    email: "",
    note: ""
  }
})

function submit() {
  emit('update:modelValue', {
    participate: form.value.participate === "1",
    companyName: form.value.companyName,
    email: form.value.email,
    note: form.value.note
  } as GeneralInfo);
  emit('submit');
}
</script>
