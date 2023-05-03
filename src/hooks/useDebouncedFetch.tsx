import { useEffect, useState } from 'react'

import { UserData } from '../models'

// A simple API with a single endpoint that returns a list of users.
const API_URL = 'https://jsonplaceholder.typicode.com/users'
const DELAY = 150 // milliseconds

// This hook models a debounced fetch, which is a common pattern when
// dealing with APIs that return a lot of data. The idea is to wait
// for the user to stop typing before making the request.
// For this hook to be more useful, we could add a parameter to
// filter the results, but for the sake of simplicity we'll just
// return the whole list of users, since the mock API doesn't
// support but very basic filtering.
export const useDebouncedFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<UserData[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(API_URL)
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

    const timer = setTimeout(fetchData, DELAY)

    return () => clearTimeout(timer)
  }, [])

  return { isLoading, data, error }
}
