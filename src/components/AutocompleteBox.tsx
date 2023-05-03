import React, { useState, useEffect, useCallback } from 'react'
import { UserData } from '../models'
import { useDebouncedFetch } from '../hooks/useDebouncedFetch'
import { KeyCodes } from '../constants'
import { MatchesList } from './MatchesList'
import { HelpSection } from './HelpSection'

export const AutocompleteBox = () => {
  const [activeMatchIndex, setActiveMatchIndex] = useState<number>(0)
  const [filteredMatches, setFilteredMatches] = useState<UserData[]>([])
  const [userInput, setUserInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const { isLoading, data: usersList, error: fetchError } = useDebouncedFetch()

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
        setUserInput('')
        break

      case KeyCodes.UP_ARROW:
        if (activeMatchIndex === 0) {
          setActiveMatchIndex(filteredMatches.length - 1)
        } else {
          setActiveMatchIndex(activeMatchIndex - 1)
        }

        break

      case KeyCodes.DOWN_ARROW:
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

  return (
    <div className="autocomplete-box-wrapper">
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
      {showResults && (
        <MatchesList
          filteredMatches={filteredMatches}
          userInput={userInput}
          selectedIndex={activeMatchIndex}
        />
      )}
      {fetchError && <p>{fetchError}</p>}
      <HelpSection isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  )
}
