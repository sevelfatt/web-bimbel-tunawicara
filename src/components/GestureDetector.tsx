"use client";

import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";

export default function GestureDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gesture, setGesture] = useState("None");
  const [isLoading, setIsLoading] = useState(true);

  const gestureMap: Record<string, string> = {
    "Open_Palm": "halo/stop",
    "Closed_Fist": "netral",
    "Victory": "terima kasih",
    "Pointing_Up": "tidak",
    "Thumb_Up": "bagus/oke",
    "Thumb_Down": "tidak bagus",
  }

  useEffect(() => {
    let gestureRecognizer: GestureRecognizer | null = null;
    let animationFrameId: number;
    let stream: MediaStream | null = null;
    let mounted = true;

    const predictLoop = () => {
      if (!mounted) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || !gestureRecognizer) {
        animationFrameId = requestAnimationFrame(predictLoop);
        return;
      }

      if (video.readyState < 2) {
        animationFrameId = requestAnimationFrame(predictLoop);
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        animationFrameId = requestAnimationFrame(predictLoop);
        return;
      }

      if (
        canvas.width !== video.videoWidth ||
        canvas.height !== video.videoHeight
      ) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      const startTimeMs = performance.now();

      try {
        const results = gestureRecognizer.recognizeForVideo(
          video,
          startTimeMs
        );

        if (
          results.gestures &&
          results.gestures.length > 0 &&
          results.gestures[0].length > 0
        ) {
          const detectedGesture =
            results.gestures[0][0].categoryName;

          const gestureText = gestureMap[detectedGesture] || detectedGesture;

          setGesture(
            `${gestureText}`
          );
        } else {
          setGesture("None");
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (
          results.landmarks &&
          results.landmarks.length > 0
        ) {
          ctx.fillStyle = "#00FF00";

          results.landmarks[0].forEach((landmark) => {
            const x = landmark.x * canvas.width;
            const y = landmark.y * canvas.height;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      } catch (error) {
        console.error("Prediction error:", error);
      }

      animationFrameId = requestAnimationFrame(predictLoop);
    };

    const setupDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        gestureRecognizer =
          await GestureRecognizer.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                delegate: "GPU",
              },
              runningMode: "VIDEO",
              numHands: 1,
            }
          );

        stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              width: 640,
              height: 480,
            },
          });

        const video = videoRef.current;

        if (!video) return;

        video.srcObject = stream;

        await new Promise<void>((resolve) => {
          video.onloadedmetadata = () => resolve();
        });

        await video.play();

        setIsLoading(false);

        predictLoop();
      } catch (error) {
        console.error(
          "Error setting up gesture detection:"
        );
        console.error(error);

        if (error instanceof Error) {
          console.error(error.message);
          console.error(error.stack);
        }
      }
    };

    setupDetection();

    return () => {
      mounted = false;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (gestureRecognizer) {
        gestureRecognizer.close();
      }
    };
  },);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="relative w-[640px] h-[480px] overflow-hidden rounded-xl bg-black shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900 text-white">
            Loading AI Models & Camera...
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
        />
      </div>

      <div className="rounded-full border bg-white px-6 py-3 text-xl font-bold shadow-sm dark:bg-neutral-800">
        Detected Gesture:{" "}
        <span className="text-blue-500">
          {gesture}
        </span>
      </div>
    </div>
  );
}