// Tests for HelpSection component:

import { render, screen } from '@testing-library/react'
import { HelpSection } from '../components/HelpSection'

describe('HelpSection', () => {
  it('should render the help section when isOpen is true', () => {
    render(<HelpSection isOpen onClose={() => console.log('Closed!')} />)

    expect(screen.getByText(/Here you can find some help/i)).toBeInTheDocument()
  })

  it('should NOT render the help section when isOpen is true', () => {
    render(
      <HelpSection isOpen={false} onClose={() => console.log('Closed!')} />
    )

    expect(
      screen.queryByText(/Here you can find some help/i)
    ).not.toBeInTheDocument()
  })
})
