<template>
  <form>
      <FormKit
          type="form"
          submit-label="Next step"
          @submit="submit()"
      >
        <BaseTitle size="2">Participant information</BaseTitle>
        <div v-for="(participant, index) in form.participants" :key="index" class=" md:mb-4 last:mb-0">
          <BaseTitle size="3">Participant {{ index + 1 }}</BaseTitle>
          <div class="flex flex-wrap flex-column gap-x-4 justify-between">
            <div class="grow md:flex gap-4">
              <FormKit v-model="participant.firstName" type="text" label="First name" validation="required"/>
              <FormKit v-model="participant.lastName" type="text" label="Last name" validation="required"/>
            </div>
            <div class="grow md:flex gap-4">
              <FormKit v-model="participant.email" type="email" label="E-mail" validation="required|email" class="grow mb-8"/>
              <FormKit v-model="participant.phoneNumber" type="tel" label="Phone number" validation="required"/>
            </div>
          </div>
          <ButtonBase icon="mdi:account-minus" @click="removeParticipant(index)" v-if="index > 0">Remove participant {{ index + 1 }}</ButtonBase>
        </div>
        <ButtonBase icon="mdi:account-plus" @click="addParticipant" class="mb-4">Add participant</ButtonBase>
        <FormKit
            v-model="form.note"
            type="textarea"
            label="We assume that everybody will be present throughout the whole program. Special requirements (room, food, parking) and other remarks to be written down here:"
        />
      </FormKit>
  </form>
</template>

<script setup lang="ts">
import BaseTitle from "~/components/BaseTitle.vue";
import {ParticipantsInfo} from "~/schema/ParticipantsInfo";

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'submit'])

const form = useState('participantsInfoForm', () => {return {participants: [], note: ""} as ParticipantsInfo})

function addParticipant() {
  form.value.participants.push({
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
  form.value.participants.splice(index, 1)
}

function submit() {
  emit('update:modelValue', form.value);
  emit('submit');
}
</script>
