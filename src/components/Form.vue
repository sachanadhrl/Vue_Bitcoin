<script setup>
import { computed } from "vue"

const emit = defineEmits(['update:currency','currValue'])

const props = defineProps({
  currency: [Number, String],
  inputType: String
})

const currInput = computed({
  get: () => props.currency,
  set: (val) => emit('update:currency', val)
})
</script>

<template>
  <form class="w-96 mx-auto my-5">
    <input v-model="currInput" @keyup="emit('currValue', currInput)" :type="inputType" class="w-full border border-gray-300 rounded-sm py-1 px-2.5 placeholder:text-black" placeholder="0">
  </form>
</template>