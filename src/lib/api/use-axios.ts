import axios, { AxiosError, AxiosResponse } from 'axios'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Handle successful response
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle response error
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Response error', error.response.data)
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received', error.request)
    } else {
      // Something happened in setting up the request
      console.error('Request setup error', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
