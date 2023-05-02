import { useEffect, useState } from 'react'
import { UserData } from '../models'

const useDebouncedFetch = (url: string, delay: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<UserData[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  useEffect(() => {
    if (!searchTerm) {
      setData(null)
      return
    }

    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(url)
        const result = await response.json()
        setData(result)
      } catch (error) {
        // TS error handling based on a neat post from Ken C. Dodds
        // URL: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        // we'll proceed, but let's report it
        setError(message)
      }

      setIsLoading(false)
    }

    if (timer) {
      clearTimeout(timer)
    }

    setTimer(setTimeout(fetchData, delay))

    return () => clearTimeout(timer)
  }, [delay, searchTerm, timer, url])

  return { isLoading, data, error, setSearchTerm }
}

export default useDebouncedFetch
