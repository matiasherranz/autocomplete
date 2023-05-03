import { FC } from 'react'
import { UserData } from '../models'
import { HighlightedText } from './HighlightedText'

type Props = {
  filteredMatches: UserData[]
  userInput: string
  selectedIndex: number
}

export const MatchesList: FC<Props> = ({
  filteredMatches,
  userInput,
  selectedIndex,
}) => {
  return filteredMatches.length > 0 ? (
    <div className="matches-list-wrapper">
      <p className="matches-list-title">
        Users with first/last name matching your search:
      </p>
      <ul className="matches">
        {filteredMatches.map((filteredMatch, index) => {
          return (
            <li
              key={index}
              className={selectedIndex === index ? 'selected-match' : ''}
            >
              <HighlightedText
                key={index}
                text={filteredMatch.name}
                highlight={userInput}
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
