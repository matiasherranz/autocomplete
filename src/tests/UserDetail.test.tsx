// Tests for UserDetail component

import { render, screen } from '@testing-library/react'
import { UserDetails } from '../components/UserDetails'
import { UserData } from '../models'

describe('UserDetails', () => {
  const user: UserData = {
    id: 1,
    name: 'John Doe',
    username: 'john.doe',
    email: 'mrjohn@mail.com',
    phone: '123456789',
  }

  it('should render the user details', () => {
    render(<UserDetails user={user} />)

    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.username)).toBeInTheDocument()
    expect(screen.getByText(user.email)).toBeInTheDocument()
    expect(screen.getByText(user.phone)).toBeInTheDocument()
  })
})
