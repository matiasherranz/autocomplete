// Tests for the MatchesList component:

import { render, screen } from '@testing-library/react'
import { MatchesList } from '../components/MatchesList'
import { UserData } from '../models'

describe('MatchesList', () => {
  const matches: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'john.doe',
      email: 'john@mail.com',
      phone: '123456789',
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'jane.doe',
      email: 'jane@mail.com',
      phone: '987654321',
    },
  ]

  it('should render the matches list', () => {
    render(
      <MatchesList filteredMatches={matches} userInput="j" selectedIndex={0} />
    )

    expect(screen.getAllByText(/Doe/i).length).toBe(2)
    expect(screen.getByText(/ane Doe/i)).toBeInTheDocument()
  })

  it('should render the matches list with no matches', () => {
    render(
      <MatchesList filteredMatches={[]} userInput="nomatch" selectedIndex={0} />
    )

    expect(screen.getByText(/No matches for your input/i)).toBeInTheDocument()
  })
})
