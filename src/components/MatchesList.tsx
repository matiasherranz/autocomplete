import { FC } from 'react'

import { UserData } from '../models'

import { HighlightedText } from './HighlightedText'

type Props = {
  filteredMatches: UserData[]
  userInput: string
  selectedIndex: number
  setActiveMatchIndex: (index: number) => void
}

export const MatchesList: FC<Props> = ({
  filteredMatches,
  userInput,
  selectedIndex,
  setActiveMatchIndex,
}) => {
  return filteredMatches.length > 0 ? (
    <div className="matches-list-wrapper">
      <ul className="matches">
        {filteredMatches.map((filteredMatch, index) => {
          return (
            <li
              key={`match-list-${index}`}
              className={selectedIndex === index ? 'selected-match' : ''}
              onClick={() => setActiveMatchIndex(index)}
            >
              <HighlightedText
                key={index}
                highlight={userInput}
                text={filteredMatch.name}
              />
            </li>
          )
        })}
      </ul>
    </div>
  ) : (
    <div>
      <p className="no-matches">
        No matches for your input. You can try again typing something else! ✏️
      </p>
    </div>
  )
}
