<script setup>
import { computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()

const prices = computed(() => store.getters.getPrice)
store.dispatch("getPrices")

const currencies = (curr) => {
  switch (curr) {
    case "AUD":
      return "Dollar Australia"
    case "EUR":
      return "Euro Eropa"
    case "GBP":
      return "Poundsterling Inggris"
    case "JPY":
      return "Yen Jepang"
    case "USD":
      return "Dollar Amerika"
  }
}

</script>

<template>  
  <h1 className="text-3xl font-bold text-center">
    Harga Bitcoin Hari Ini
  </h1>

  <table class="min-w-full border text-left text-sm font-light mt-5">
    <thead class="border-b">
      <tr>
        <th
          scope="col"
          class="border-r px-6 py-4">
          Mata Uang
        </th>
        <th
          scope="col"
          class="border-r px-6 py-4">
          Harga Beli Bitcoin
        </th>
        <th
          scope="col"
          class="border-r px-6 py-4">
          Harga Jual Bitcoin
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(price, index) in prices" :key="index" class="border-b">
        <td
          class="whitespace-nowrap border-r px-6 py-4 font-medium">
          {{ currencies(price.symbol) }}
        </td>
        <td
          class="whitespace-nowrap border-r px-6 py-4">
          {{ price.buy }}
        </td>
        <td
          class="whitespace-nowrap border-r px-6 py-4">
          {{ price.sell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>