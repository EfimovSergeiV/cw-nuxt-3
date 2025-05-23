// pnpm add maska
// import { vMaska } from "maska/vue"

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.directive("maska", vMaska)
// })

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tel-input', {
    mounted(el: HTMLInputElement) {
      const getInputNumbersValue = (input: HTMLInputElement) =>
        input.value.replace(/\D/g, '')

      const onPhonePaste = (e: ClipboardEvent) => {
        const input = e.target as HTMLInputElement
        const inputNumbersValue = getInputNumbersValue(input)
        const pasted = e.clipboardData || (window as any).clipboardData
        if (pasted) {
          const pastedText = pasted.getData('Text')
          if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue
          }
        }
      }

      const onPhoneInput = (e: InputEvent) => {
        const input = e.target as HTMLInputElement
        let inputNumbersValue = getInputNumbersValue(input)
        const selectionStart = input.selectionStart ?? 0
        let formattedInputValue = ''

        if (!inputNumbersValue) {
          input.value = ''
          return
        }

        if (input.value.length !== selectionStart) {
          if ((e as any).data && /\D/g.test((e as any).data)) {
            input.value = inputNumbersValue
          }
          return
        }

        if (['7', '8', '9'].includes(inputNumbersValue[0])) {
          if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue
          const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7'
          formattedInputValue = firstSymbols + ' '
          if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
          }
          if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
          }
          if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
          }
          if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
          }
        } else {
          formattedInputValue = '+' + inputNumbersValue.substring(0, 16)
        }

        input.value = formattedInputValue
      }

      const onPhoneKeyDown = (e: KeyboardEvent) => {
        const input = e.target as HTMLInputElement
        const inputValue = input.value.replace(/\D/g, '')
        if (e.key === 'Backspace' && inputValue.length === 1) {
          input.value = ''
        }
      }

      el.addEventListener('keydown', onPhoneKeyDown)
      el.addEventListener('input', onPhoneInput)
      el.addEventListener('paste', onPhonePaste)
    },
  })
})