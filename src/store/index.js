import { createStore } from "vuex"

import axiosClient from '../axios'

const store = createStore({
  state: {
    prices: []
  },
  getters: {
    getPrice: (state) => {
      const price = state.prices
      const currencies = ['AUD', 'EUR', 'GBP', 'JPY', 'USD']
      
      const filteredPrice = Object.keys(price)
        .filter(key => currencies.includes(key))
        .reduce((obj, key) => {
          obj[key] = price[key]
          return obj
        }, {})

      return filteredPrice
    }
  },
  actions: {
    getPrices({ commit }) {
      return axiosClient('/ticker')
        .then((res) => {
          commit('GET_PRICES', res.data)
        })
        .catch((err) => {
          throw err
        })
    }
  },
  mutations: {
    GET_PRICES: (state, prices) => {
      state.prices = prices
    }
  }
})

export default store