import { createRouter, createWebHistory } from "vue-router"

const Price = () => import('../views/Price.vue')
const PriceConvert = () => import('../views/PriceConvert.vue')

const routes = [
  {
    path: '/',
    name: 'prices',
    component: Price
  },
  {
    path: '/rp-to-btc',
    name: 'rupiah_btc',
    component: PriceConvert
  },
  {
    path: '/btc-to-rp',
    name: 'btc_rupiah',
    component: PriceConvert
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router