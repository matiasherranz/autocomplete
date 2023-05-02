import React, { useState, useEffect, useRef, useCallback } from 'react'
import { UserData } from '../models'
import useDebouncedFetch from '../hooks/useDebouncedFetch'
import { KeyCodes } from '../constants'
import { MatchesList } from './MatchesList'

// A simple API with a single endpoint that returns a list of users.
const API_URL = 'https://jsonplaceholder.typicode.com/users'
const DELAY = 150 // milliseconds

export const AutocompleteBox = () => {
  const {
    isLoading,
    data: usersList,
    error: fetchError,
    setSearchTerm,
  } = useDebouncedFetch(API_URL, DELAY)

  const [activeMatchIndex, setActiveMatchIndex] = useState<number>(0)
  const [filteredMatches, setFilteredMatches] = useState<UserData[]>([])
  const [userInput, setUserInput] = useState('')

  const [showResults, setShowResults] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fetchError && usersList && usersList.length > 0) {
      const filteredMatches = usersList.filter((user) => {
        const userName = user.name.toLowerCase()
        const input = userInput.toLowerCase()
        return userName.includes(input)
      })
      setFilteredMatches(filteredMatches)
      setShowResults(true)
    }
  }, [fetchError, userInput, usersList])

  // detects click outside the input to close it / clean data
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setFilteredMatches([])
  //       setShowResults(false)
  //     }
  //   }

  //   // Bind the event listener
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [wrapperRef])

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const userInput = e.currentTarget.value
      if (userInput && userInput.length > 0) setSearchTerm(userInput)

      // If the user cleared the input, we clean the suggestions
      if (!userInput || userInput.length === 0) {
        setFilteredMatches([])
        setShowResults(false)
      }

      setUserInput(userInput)
    },
    [setSearchTerm]
  )

  // const onClick = (e: {
  //   currentTarget: { innerText: React.SetStateAction<string> }
  // }) => {
  //   setUserInput(e.currentTarget.innerText)
  //   setFilteredMatches([])
  //   setActiveMatchIndex(0)
  //   setShowResults(false)
  // }

  console.log('activeMatchIndex', activeMatchIndex)
  // Keyboard accessibility events
  const onKeyDown = (e: { keyCode: number }) => {
    switch (e.keyCode) {
      case KeyCodes.ENTER:
        if (!activeMatchIndex) return

        // pressing enter should select the active match
        setActiveMatchIndex(0)
        setShowResults(false)
        setUserInput(filteredMatches[activeMatchIndex].name)
        break

      case KeyCodes.ESCAPE:
        // pressing escape should cleanup the suggestions box
        setShowResults(false)
        setFilteredMatches([])
        break

      case KeyCodes.UP_ARROW:
        if (activeMatchIndex === 0) return
        setActiveMatchIndex(activeMatchIndex - 1)
        break

      case KeyCodes.DOWN_ARROW:
        if (activeMatchIndex - 1 === filteredMatches.length) {
          // if no active match or on the last one, set it to the first one
          setActiveMatchIndex(0)
        } else {
          setActiveMatchIndex(activeMatchIndex - 1)
        }
        break

      default:
        break
    }
  }

  return (
    <div className="autocomplete-box-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={userInput}
        onChange={handleSearch}
        onKeyDown={onKeyDown}
        className={`autocomplete-box-input ${
          showResults &&
          filteredMatches.length > 0 &&
          'input-autocomplete-with-results'
        }`}
        placeholder="Type to search and filter users..."
      />
      {isLoading && <p>Loading...</p>}

      {showResults && (
        <MatchesList filteredMatches={filteredMatches} userInput={userInput} />
      )}

      {/* {usersList && <p>{JSON.stringify(usersList.map((u) => u.name))}</p>} */}
      {fetchError && <p>{fetchError}</p>}
    </div>
  )
}
