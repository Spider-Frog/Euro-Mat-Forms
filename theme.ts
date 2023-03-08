const standardForm = {
  outer: 'my-4 last:mb-0 grow',
  label: 'block font-bold',
  input: 'w-full p-4 transition-all ease-in-out border-2 bg-gray-200 border-gray-300 focus:bg-gray-400 focus:border-gray-500 cursor-pointer',
  help: 'text-xs text-gray-500',
  messages: 'list-none p-0 mt-1 mb-0',
  message: 'text-red-500'
}

const buttonForm = {
  outer: 'mb-4',
  label: 'block font-bold',
  input: 'w-full p-4 transition-all ease-in-out border-2 bg-gray-200 border-gray-300 hover:bg-gray-400 hover:border-gray-500 cursor-pointer',
  help: 'text-xs text-gray-500',
  messages: 'list-none p-0 mt-1 mb-0',
  message: 'bg-red-500'
}


export default {
  button: buttonForm,
  text: standardForm,
  email: standardForm,
  number: standardForm,
  select: standardForm,
  tel: standardForm,
  textarea: standardForm,
  password: standardForm,
  submit: buttonForm,
  radio: {
    wrapper: 'flex cursor-pointer',
    label: 'py-2',
    input: 'cursor-pointer orm-check-input appearance-none rounded-full p-4 h-4 w-4 border-2 border-gray-300 bg-white checked:bg-gray-400 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2',
    messages: 'list-none p-0 mt-1 mb-0',
    message: 'text-red-500'
  },
  checkbox: {
    wrapper: 'flex cursor-pointer',
    label: 'py-2',
    input: 'cursor-pointer orm-check-input appearance-none p-4 h-4 w-4 border border-gray-300 bg-white checked:bg-gray-400 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2',
    messages: 'list-none p-0 mt-1 mb-0',
    message: 'text-red-500'
  }
}
