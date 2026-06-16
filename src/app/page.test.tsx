import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Landing Page', () => {
  it('renders the dummy information correctly', () => {
    render(<Page />)
    
    // Check if main heading is present
    const heading = screen.getByRole('heading', { name: /selamat datang di bimbel tunawicara/i })
    expect(heading).toBeInTheDocument()

    // Check if the get started link is there
    const link = screen.getByRole('link', { name: /mulai translator/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/translator')
  })
})
