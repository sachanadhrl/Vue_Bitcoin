<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  {
    to: { name: 'prices' },
    title: 'Harga Bitcoin'
  },
  {
    to: { name: 'rupiah_btc' },
    title: 'Konversi Rupiah ke Bitcoin'
  },
  {
    to: { name: 'btc_rupiah' },
    title: 'Konversi Bitcoin ke Rupiah'
  },
]
</script>

<template>
  <nav class="w-full shadow-md p-2.5 mb-10">
    <ul class="flex justify-center">
      <li v-for="(link, index) in navLinks" :key="index" class="px-5" :class="[route.name === link.to.name ? 'font-bold' : '']">
        <router-link :to="link.to">{{ link.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>