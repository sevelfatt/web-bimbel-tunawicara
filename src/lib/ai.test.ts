import { analyzeFrame } from './ai'

// Mocking transformers.js pipeline
jest.mock('@xenova/transformers', () => {
  return {
    pipeline: jest.fn().mockResolvedValue(
      jest.fn().mockResolvedValue([{ label: 'Oke', score: 0.99 }])
    ),
    env: { allowLocalModels: false, useBrowserCache: false }
  }
})

describe('AI Translator Inference', () => {
  it('analyzes a frame and returns gestur and ekspresi', async () => {
    // Dummy HTMLVideoElement
    const dummyVideo = document.createElement('video')
    const result = await analyzeFrame(dummyVideo)

    expect(result).toHaveProperty('gesture')
    expect(result).toHaveProperty('expression')
    expect(result.gesture).toBe('Oke')
  })
})
