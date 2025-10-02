import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://scaling-funicular-wxg5rxww6xpc59v-4000.app.github.dev/'
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default API
