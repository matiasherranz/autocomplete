import { FC } from 'react'
import { UserData } from '../models'
import { HighlightedText } from './HighlightedText'

type Props = {
  filteredMatches: UserData[]
  userInput: string
}

export const MatchesList: FC<Props> = ({ filteredMatches, userInput }) => {
  return filteredMatches.length > 0 ? (
    <div className="matches-list-wrapper">
      <p className="matches-list-title">Matches</p>
      <ul className="matches">
        {filteredMatches.map((filteredMatch, index) => {
          return (
            <li key={index}>
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
