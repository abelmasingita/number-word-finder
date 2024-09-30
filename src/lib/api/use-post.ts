import { useState } from 'react'
import type { AxiosResponse } from 'axios'
import axiosInstance from './use-axios'

interface ApiResponse<T> {
  data: T[] | null
  error: string | null
  loading: boolean
  postData: (body: unknown) => Promise<void>
}

function usePost<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const postData = async (body: unknown) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      //calls post url to pass data
      const response: AxiosResponse<T[]> = await axiosInstance.post(url, body)

      if (response.status === 200) {
        setData(response.data)
      } else {
        setError(response.statusText || 'Unknown error occurred')
      }
    } catch (error: any) {
      setError(error.message || 'Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, postData }
}

export default usePost
