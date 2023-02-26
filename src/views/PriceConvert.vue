<script setup>
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Form from '../components/Form.vue'

const route = useRoute()
const store = useStore()

let title = ref('')
// 
let bitcoin = ref(null)
let rupiah = ref(null)
//
let idrCurr = ref(null)
let btcCurr = ref(null)

// get bitcoin in usd
const btcInUSD = computed(() => {
  const currencies = store.getters.getPrice
  return currencies["USD"].last
})

const routeCondition = (route) => {
  if (route === "rupiah_btc") {
    title = "Rupiah ke Bitcoin"
    rupiah.value = null
    bitcoin.value = null
    idrCurr.value = null
    btcCurr.value = null
  } else {
    title = "Bitcoin ke Rupiah" 
    rupiah.value = null
    bitcoin.value = null
    idrCurr.value = null
    btcCurr.value = null
    store.dispatch("getPrices")
  }
}

onBeforeMount(() => {
  routeCondition(route.name)
})
onBeforeRouteLeave((to, from) => {
  routeCondition(to.name)
})

// konversi rupiah ke bitcoin
const idrToBtc = async (val) => {
  const idr = (val / 14000).toFixed(2)
  const usd = parseFloat(idr)
  try {
    const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=' + usd)
    bitcoin.value = res.data.toFixed(8)
  } catch (error) {
    throw error
  }
}

// konversi bitcoin ke dollar
const btcToIdr = async (val) => {
  const value = parseFloat(val)
  try {
    if (!isNaN(value)) {
      const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=' + value)
      const btc = (btcInUSD.value * res.data) * btcInUSD.value
      const idr = (btc * 14000)
      
      rupiah.value = Math.round(idr)
    }
  } catch (error) {
    throw error
  }
}
</script>

<template>
  <div class="text-center font-bold">
    <h1 className="text-3xl">
      Konversi {{ title }}
    </h1>
    <h3 class="text-xl mt-2.5">
      Kurs 1 USD = 14.000 IDR
    </h3>

    <div v-if="route.name === 'rupiah_btc'">
      <Form v-model:currency="idrCurr" :inputType="'number'" @currValue="idrToBtc" />
  
      <h1 className="text-3xl">
        RP {{ idrCurr ? idrCurr : '0' }} = BTC {{ bitcoin ? bitcoin : '0' }}
      </h1>
    </div>
    <div v-else>
      <Form v-model:currency="btcCurr" :inputType="'text'" @currValue="btcToIdr" />
  
      <h1 className="text-3xl">
        BTC {{ btcCurr ? btcCurr : '0' }} = Rp {{ rupiah ? rupiah : '0' }}
      </h1>
    </div>

  </div>
</template>