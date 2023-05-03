import React, { useState, useEffect, useCallback, useRef } from 'react'

import { KeyCodes } from '../constants'
import { useDebouncedFetch } from '../hooks/useDebouncedFetch'
import { UserData } from '../models'

import { HelpSection } from './HelpSection'
import { MatchesList } from './MatchesList'
import { UserDetails } from './UserDetails'

export const AutocompleteBox = () => {
  const [activeMatchIndex, setActiveMatchIndex] = useState<number>(0)
  const [filteredMatches, setFilteredMatches] = useState<UserData[]>([])
  const [userInput, setUserInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)

  const { isLoading, data: usersList, error: fetchError } = useDebouncedFetch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!fetchError && usersList && usersList.length > 0 && userInput) {
      const filteredMatches = usersList.filter((user) => {
        const userName = user.name.toLowerCase()
        const input = userInput.toLowerCase()
        return userName.includes(input)
      })
      setFilteredMatches(filteredMatches)
      setShowResults(true)
    }
  }, [fetchError, userInput, usersList])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value

    // If the user cleared the input, we clean the suggestions
    if (!userInput || userInput.length === 0) {
      setFilteredMatches([])
      setShowResults(false)
      setActiveMatchIndex(0)
    }

    setUserInput(userInput)
  }, [])

  // Keyboard accessibility events
  const onKeyDown = (e: { keyCode: number }) => {
    if (!userInput || !filteredMatches || filteredMatches.length === 0) return

    switch (e.keyCode) {
      case KeyCodes.DELETE:
      case KeyCodes.BACKSPACE:
        // pressing delete or backspace should cleanup the matches list as well as the user details section, if open
        setActiveMatchIndex(0)
        setShowResults(false)
        setShowUserDetails(false)
        break

      case KeyCodes.ENTER:
        // pressing enter should select the active match
        // setActiveMatchIndex(0)
        setShowResults(true)
        // setUserInput(filteredMatches[activeMatchIndex].name)
        setShowUserDetails(true)
        break

      case KeyCodes.ESCAPE:
        // pressing escape should cleanup the matches list as well as the user details
        // section, if open
        setShowResults(false)
        setFilteredMatches([])
        setUserInput('')
        setShowUserDetails(false)
        break

      case KeyCodes.UP_ARROW:
        setShowUserDetails(false)
        if (activeMatchIndex === 0) {
          setActiveMatchIndex(filteredMatches.length - 1)
        } else {
          setActiveMatchIndex(activeMatchIndex - 1)
        }

        break

      case KeyCodes.DOWN_ARROW:
        setShowUserDetails(false)
        if (activeMatchIndex === filteredMatches.length - 1) {
          // if no active match or on the last one, set it to the first one
          setActiveMatchIndex(0)
        } else {
          setActiveMatchIndex(activeMatchIndex + 1)
        }
        break

      default:
        break
    }
  }

  const handleUserClick = (index: number) => {
    setActiveMatchIndex(index)
    setShowResults(true)
    setShowUserDetails(true)
    inputRef.current?.focus()
  }

  return (
    <div className="autocomplete-box-wrapper">
      <input
        ref={inputRef}
        className={`autocomplete-box-input ${
          showResults &&
          filteredMatches.length > 0 &&
          'input-autocomplete-with-results'
        }`}
        placeholder="Type to search and filter users..."
        type="text"
        value={userInput}
        onChange={handleSearch}
        onKeyDown={onKeyDown}
      />

      <div className="help-link">
        Need help?{' '}
        <button
          className="button-link"
          type="submit"
          onClick={() => setShowHelp(true)}
        >
          Click here!
        </button>
      </div>
      {isLoading && <p>Loading users data...</p>}

      {/* List of filtered results: */}
      {showResults && (
        <MatchesList
          filteredMatches={filteredMatches}
          selectedIndex={activeMatchIndex}
          setActiveMatchIndex={handleUserClick}
          userInput={userInput}
        />
      )}

      {/* Detail view of the selected user */}
      {showUserDetails && (
        <UserDetails user={filteredMatches[activeMatchIndex]} />
      )}

      {/* Help section: */}
      <HelpSection isOpen={showHelp} onClose={() => setShowHelp(false)} />

      {/* API error: */}
      {fetchError && <p>{fetchError}</p>}
    </div>
  )
}
