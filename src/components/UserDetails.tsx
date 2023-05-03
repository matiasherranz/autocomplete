import { FC } from 'react'
import { UserData } from '../models'

interface Props {
  user: UserData
}

export const UserDetails: FC<Props> = ({ user }) => {
  return (
    <div className="user-details-wrapper">
      <div className="user-details">
        <h1>Details of the selected user</h1>
        <ul>
          <li>
            <strong>Name:</strong> {user.name}
          </li>
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Phone:</strong> {user.phone}
          </li>
        </ul>
      </div>
    </div>
  )
}
