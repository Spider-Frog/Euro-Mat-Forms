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
          label="E-mail (will be used for invoicing)"
          validation="required|email"
      />
      <FormKit
          v-model="form.companyName"
          type="text"
          label="Company name"
          validation="required"
      />
      <FormKit
          v-model="form.companyAddress"
          type="text"
          label="Company address (will be used on the invoice)"
          validation="required"
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
    companyAddress: "",
    email: ""
  }
})

function submit() {
  emit('update:modelValue', {
    participate: form.value.participate === "1",
    companyName: form.value.companyName,
    email: form.value.email
  } as GeneralInfo);
  emit('submit');
}
</script>
