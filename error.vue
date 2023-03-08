<template>
    <div class="bg-neutral-800 min-h-screen p-2 md:p-8">
    <div class="bg-white md:w-3/4 m-auto border-2 border-solid border-slate-300 p-8">
      <header class="border-b-2 border-solid border-slate-300 p-4">
        <img class="w-full lg:w-2/3 xl:w-1/2 m-auto" src="/logo.jpg">
<!--        <p class="pt-4 text-right">-->
<!--          Logged in as <LinkRouter to="/admin">John Doe</LinkRouter>-->
<!--        </p>-->
      </header>
      <main>
        <div>
          <BaseSection title="Error">
            <p v-if="statusCode">
              {{ statusCode }} - {{ statusMessage }}
            </p>
            <p v-else>
              Unknown error has occurred.
            </p>
            <b>
              For more information, please contact:
            </b>
            <p>
              Marylène Doub<br />
              Tel.: +31 (0) 85 9022 822<br />
              E-mail: doub@euro-mat.com
            </p>
            <ButtonBase @click="handleError">
              Go to home page
            </ButtonBase>
          </BaseSection>
        </div>
      </main>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({  error: Object});

const statusCode = useState('statusCode', () => {})
const statusMessage = useState('statusMessage', () => {})

if (props.error) {
  if (props.error.hasOwnProperty('statusCode')) {
    statusCode.value = props.error.statusCode
  }
  if (props.error.hasOwnProperty('statusMessage')) {
    statusMessage.value = props.error.statusMessage
  }

}

const handleError = () => clearError({ redirect: '/' });
</script>

<style scoped>

</style>
