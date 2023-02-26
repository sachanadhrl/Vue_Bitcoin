import axios from "axios"

const axiosClient = axios.create({
  baseURL: 'https://blockchain.info'
})

export default axiosClient