// import '@testing-library/jest-dom'
// import { render, screen, waitFor } from '@testing-library/react'
// import TranslatorPage from './page'

// // Mocking navigator.mediaDevices
// const mockGetUserMedia = jest.fn()
// Object.defineProperty(global.navigator, 'mediaDevices', {
//   value: {
//     getUserMedia: mockGetUserMedia,
//   },
// })

// describe('Translator Page', () => {
//   beforeEach(() => {
//     mockGetUserMedia.mockReset()
//   })

//   it('renders the title', () => {
//     mockGetUserMedia.mockResolvedValueOnce({ getTracks: () => [] })
//     render(<TranslatorPage />)
//     const heading = screen.getByRole('heading', { name: /translator ai/i })
//     expect(heading).toBeInTheDocument()
//   })

//   it('requests camera access on mount and shows a video element', async () => {
//     const mockStream = { getTracks: () => [{ stop: jest.fn() }] }
//     mockGetUserMedia.mockResolvedValueOnce(mockStream)
    
//     render(<TranslatorPage />)
    
//     await waitFor(() => {
//       expect(mockGetUserMedia).toHaveBeenCalledWith({ video: true })
//     })

//     const videoElement = screen.getByTestId('camera-stream')
//     expect(videoElement).toBeInTheDocument()
//   })

//   it('displays a placeholder for gesture and expression output', async () => {
//     mockGetUserMedia.mockResolvedValueOnce({ getTracks: () => [] })
//     render(<TranslatorPage />)

//     const gestureOutput = await screen.findByText(/gestur terdeteksi/i)
//     const expressionOutput = await screen.findByText(/ekspresi terdeteksi/i)

//     expect(gestureOutput).toBeInTheDocument()
//     expect(expressionOutput).toBeInTheDocument()
//   })
// })
