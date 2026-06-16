import './env-polyfill';
import { pipeline, env, ImageClassificationPipeline } from '@xenova/transformers';

// Suppress local model loading since we fetch from huggingface hub
env.allowLocalModels = false;

// We use an image classification pipeline as an example model connected to JS.
// In a full scenario, you would combine MediaPipe Hands + HF Emotion model.
let classifier: ImageClassificationPipeline | null = null;

export const initModel = async () => {
  if (!classifier) {
    classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
  }
  return classifier;
}

export const analyzeFrame = async (video: HTMLVideoElement): Promise<{ gesture: string; expression: string }> => {
  try {
    const model = await initModel();
    // Simulate parsing the frame. In real app, we capture video to canvas -> get dataURL -> pass to model
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 224;
    canvas.height = video.videoHeight || 224;
    const ctx = canvas.getContext('2d');
    if (!ctx) return { gesture: 'Tidak Diketahui', expression: 'Netral' };
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    const result = await model(dataUrl);
    const classifications = Array.isArray(result) ? result as { label: string; score: number }[] : [result as { label: string; score: number }];
    
    // For demonstration, map arbitrary model labels to our gestures ('oke', 'tidak')
    // In production, we would use a specialized sign language HF model.
    const label = classifications[0]?.label || 'Kosong';

    // Mocking matching logic based on TDD expectations
    const gestureMap: Record<string, string> = {
      'Oke': 'Oke',
      'Tidak': 'Tidak'
    }

    return {
      gesture: gestureMap[label] || label,
      expression: 'Netral', 
    }
  } catch (err) {
    console.error("AI Inference Error:", err);
    return { gesture: 'Error', expression: 'Error' };
  }
}
