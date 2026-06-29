import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import QuizPage from './page'
import React from 'react'

// Mock React.use to avoid React 19 asynchronous suspension warning in JSDOM
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    use: (promise: any) => {
      // Synchronously return dynamic parameters for testing
      return { island: 'sumatera' };
    }
  };
});

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Compass: () => <div data-testid="compass-icon" />,
  CheckCircle2: () => <div data-testid="check-icon" />,
  XCircle: () => <div data-testid="x-icon" />,
  ArrowRight: () => <div data-testid="arrow-icon" />,
  Award: () => <div data-testid="award-icon" />,
  RotateCcw: () => <div data-testid="rotate-icon" />,
}))

describe('Quiz Play Page', () => {
  it('renders Sumatera quiz questions correctly and updates state on interaction', async () => {
    const params = Promise.resolve({ island: 'sumatera' })
    
    render(<QuizPage params={params} />)
    
    // Check if the title shows Sumatera
    const title = screen.getByText(/Kuis: Pulau Sumatera/i)
    expect(title).toBeInTheDocument()
    
    // Check if the first question of Sumatra appears
    const questionText = screen.getByText(/Rumah adat asal daerah Sumatera Barat yang atapnya menyerupai tanduk kerbau/i)
    expect(questionText).toBeInTheDocument()
    
    // Check options
    const optionGadang = screen.getByRole('button', { name: /Rumah Gadang/i })
    const optionJoglo = screen.getByRole('button', { name: /Rumah Joglo/i })
    expect(optionGadang).toBeInTheDocument()
    expect(optionJoglo).toBeInTheDocument()
    
    // Select an option (Rumah Gadang is correct)
    fireEvent.click(optionGadang)
    
    // Click check answer button
    const checkBtn = screen.getByRole('button', { name: /Periksa Jawaban/i })
    fireEvent.click(checkBtn)
    
    // Verify positive feedback title shown 
    const feedbackTitle = screen.getByText(/Keren, Jawaban Benar!/i)
    expect(feedbackTitle).toBeInTheDocument()
    
    // Check if check button changed to Next button
    const nextBtn = screen.getByRole('button', { name: /Jawaban Berikutnya/i })
    expect(nextBtn).toBeInTheDocument()
  })
})
