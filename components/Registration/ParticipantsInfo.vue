<template>
  <form>
      <FormKit
          type="form"
          submit-label="Next step"
          @submit="submit()"
      >
        <div v-for="(participant, index) in form" :key="index" class="mb-4 last:mb-0">
          <BaseTitle size="2">Participant information</BaseTitle>
          <BaseTitle size="3">Participant {{ index + 1 }}</BaseTitle>
          <div class="flex flex-wrap justify-between">
            <FormKit v-model="participant.email" type="email" label="E-mail" validation="required|email" class="grow mb-8"/>
            <FormKit v-model="participant.phoneNumber" type="tel" label="Phone number" validation="required"/>
            <FormKit v-model="participant.firstName" type="text" label="First name" validation="required"/>
            <FormKit v-model="participant.lastName" type="text" label="Last name" validation="required"/>
          </div>
<!--          <Title size="3">Flight Information</Title>-->
<!--          <div class="flex flex-wrap">-->
<!--            <FormInput v-model="participant.flight.arrival_timestamp" class="flex-grow w-1/3 mx-2" name="Arrival Date & Time" />-->
<!--            <FormInput v-model="participant.flight.arrival_flight_number" class="flex-grow w-1/3 mx-2" name="Arrival Flight number" />-->
<!--            <FormInput v-model="participant.flight.arrival_airport" class="flex-grow w-1/3 mx-2" name="Airport of arrival" />-->
<!--            <FormInput v-model="participant.flight.arrival_transfer" class="flex-grow w-1/3 mx-2" name="Transfer from airport to hotel" />-->
<!--            <FormInput v-model="participant.flight.departure_timestamp" class="flex-grow w-1/3 mx-2" name="Departure Date & Time" />-->
<!--            <FormInput v-model="participant.flight.departure_flight_number" class="flex-grow w-1/3 mx-2" name="Departure Flight number" />-->
<!--            <FormInput v-model="participant.flight.departure_airport" class="flex-grow w-1/3 mx-2" name="Airport of departure" />-->
<!--            <FormInput v-model="participant.flight.departure_transfer" class="flex-grow w-1/3 mx-2" name="Transfer from hotel to airport" />-->
<!--          </div>-->
          <ButtonBase icon="mdi:account-minus" @click="removeParticipant(index)" v-if="index > 0">Remove participant {{ index + 1 }}</ButtonBase>
        </div>
        <ButtonBase icon="mdi:account-plus" @click="addParticipant" class="mb-4">Add participant</ButtonBase>
      </FormKit>
  </form>
</template>

<script setup lang="ts">
import BaseTitle from "~/components/BaseTitle.vue";
import {ParticipantsInfo} from "~/schema/ParticipantsInfo";

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'submit'])

const form = useState('participantsInfoForm', () => [] as ParticipantsInfo)

function addParticipant() {
  form.value.push({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: ""
  })
}

onMounted(() => {
  addParticipant();
})

function removeParticipant(index: number) {
  form.value.splice(index, 1)
}

function submit() {
  emit('update:modelValue', form.value);
  emit('submit');
}
</script>
