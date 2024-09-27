import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

import axiosInstance from './use-axios'

type ApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
  fetchData: () => Promise<T>
}

function useGet<T>(url: string, isLazy = false): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async (): Promise<T> => {
    try {
      setLoading(true)
      const response: AxiosResponse<T> = await axiosInstance.get(url)

      if (response.status == 200) {
        setData(response.data)
      } else if (response.status != 200) {
        setError(response.statusText)
      } else {
        setError('Unknown error occurred')
      }
      return response.data
    } catch (error: any) {
      setError(error.message || 'Network error occurred')
      return error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isLazy) fetchData()
  }, [isLazy, url])

  return { data, error, loading, fetchData }
}

export default useGet
