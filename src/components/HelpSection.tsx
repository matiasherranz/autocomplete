import { FC } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const HelpSection: FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="help-wrapper">
      <div className="help-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        Here you can find some help!
        <ul>
          <li>
            <strong>Search:</strong> type something in the input field to search
            for users. You can search by first name, last name or both.
          </li>
          <li>
            <strong>Highlighted matches:</strong> If the search matches any
            users (by first name, last name or both), the matches will be
            highlighted in the results.
          </li>
          <li>
            <strong>Navigate:</strong> You can navigate the results with the
            <code> up/down arrow keys</code>. You can also select a result by
            pressing <code>enter</code>.
          </li>
          <li>
            <strong>Select:</strong> You can also select a result by pressing{' '}
            <code>enter</code>.
          </li>
          <li>
            <strong>Cleanup:</strong> You can clean the search terms you typed
            by either deleting or more conveniently by pressing the{' '}
            <code>escape</code> key.
          </li>
        </ul>
      </div>
    </div>
  )
}
