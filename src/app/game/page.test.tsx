import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import GamePage from './page'

// Mock Lucide-react Compass icon
jest.mock('lucide-react', () => ({
  Compass: () => <div data-testid="compass-icon" />,
}))

describe('Game Selection Page', () => {
  it('renders the island selection cards correctly', () => {
    render(<GamePage />)
    
    // Check if main heading is present
    const heading = screen.getByRole('heading', { name: /game kuis budaya nusantara/i })
    expect(heading).toBeInTheDocument()

    // Check if the islands list is rendered
    expect(screen.getByText('Pulau Sumatera')).toBeInTheDocument()
    expect(screen.getByText('Pulau Jawa')).toBeInTheDocument()
    expect(screen.getByText('Pulau Kalimantan')).toBeInTheDocument()
    expect(screen.getByText('Pulau Sulawesi')).toBeInTheDocument()
    expect(screen.getByText('Pulau Papua')).toBeInTheDocument()

    // Check if link attributes are set correctly
    const javaLink = screen.getByRole('link', { name: /pulau jawa/i })
    expect(javaLink).toHaveAttribute('href', '/game/quiz/jawa')
  })
})
