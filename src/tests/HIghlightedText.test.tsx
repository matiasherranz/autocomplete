// Tests for HIghlightedText component:

import { render, screen } from '@testing-library/react'
import { HighlightedText } from '../components/HighlightedText'

describe('HighlightedText', () => {
  it('should render the text with the highlight', () => {
    render(<HighlightedText text="Hello World" highlight="World" />)

    expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    expect(screen.getByText(/World/i)).toBeInTheDocument()
  })

  it('should render the text without the highlight', () => {
    render(<HighlightedText text="Hello World" highlight="John" />)

    expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    expect(screen.queryByText(/John/i)).not.toBeInTheDocument()
  })
})
