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

        <ul>
          <li>
            <strong>Search</strong>
            <p>
              Type something in the input field to search for users. You can
              search by first name, last name or both.
            </p>
          </li>
          <li>
            <strong>Highlighted matches</strong>
            <p>
              If the search matches any users (by first name, last name or
              both), the matches will be highlighted in the results.
            </p>
          </li>
          <li>
            <strong>Navigate</strong>
            <p>
              You can navigate the results with the
              <code> up/down arrow keys</code>. You can also select a result by
              pressing <code>enter</code>. Mouse navigation is also supported.
            </p>
          </li>
          <li>
            <strong>Select</strong>
            <p>
              You can also select a result by pressing <code>enter</code>. Once
              you select a user, you'll be able to see their full details.
            </p>
          </li>
          <li>
            <strong>Cleanup</strong>
            <p>
              You can clean the search terms you typed by either deleting or
              more conveniently by pressing the <code>escape</code> key.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
