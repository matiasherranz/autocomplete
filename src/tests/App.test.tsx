// Tests for the App component and the need help link:
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders need help link', () => {
  render(<App />)
  const linkElement = screen.getByText(/need help/i)
  expect(linkElement).toBeInTheDocument()
})
