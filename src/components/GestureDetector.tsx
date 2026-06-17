"use client";

import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import mainFeatureBg from "@/assets/main-feature-bg.jpeg";

function MainFeatureListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex flex-row justify-start items-center w-full text-lg font-semibold">
      <Check className="w-8 h-8 mr-3 border-2 rounded-full" />
      {children}
    </li>
  );
}

export default function GestureDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gesture, setGesture] = useState("None");
  const [isLoading, setIsLoading] = useState(true);

  const gestureMap: Record<string, string> = {
    Open_Palm: "halo/stop",
    Closed_Fist: "netral",
    Victory: "terima kasih",
    Pointing_Up: "tidak",
    Thumb_Up: "bagus/oke",
    Thumb_Down: "tidak bagus",
  };

  const gestureEmojiMap: Record<string, string> = {
    Open_Palm: "✋",
    Closed_Fist: "✊",
    Victory: "✌️",
    Pointing_Up: "☝️",
    Thumb_Up: "👍",
    Thumb_Down: "👎",
  };

  const [rawGesture, setRawGesture] = useState("None");

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

          const gestureText =
            gestureMap[detectedGesture] || detectedGesture;

          setGesture(`${gestureText}`);
          setRawGesture(detectedGesture);
        } else {
          setGesture("None");
          setRawGesture("None");
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.landmarks && results.landmarks.length > 0) {
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

        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1280,
            height: 720,
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
        console.error("Error setting up gesture detection:");
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
  }, []);

  const currentEmoji = gestureEmojiMap[rawGesture] || "🤚";
  const currentLabel =
    gesture !== "None" ? gesture.charAt(0).toUpperCase() + gesture.slice(1) : "Menunggu...";

  return (
    <div className="relative flex flex-row w-fit mx-auto shadow-2xl rounded-2xl p-10 mt-10 overflow-hidden space-x-10">
      {/* Background Image */}
      <div
        className="absolute z-0 inset-0 bg-cover bg-no-repeat opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${mainFeatureBg.src})` }}
      />

      {/* Optional white overlay */}
      <div className="absolute z-20 inset-0 bg-white/10 pointer-events-none" />

      {/* Content */}
      {/* <div className="relative z-10 flex flex-col justify-start items-start w-fit">
        <div className="flex flex-col justify-start items-start w-fit">
          <h1 className="text-4xl font-semibold">Gesture Detector</h1>
          <p className="text-xl mt-2 text-gray-700">
            Teknologi interaktif untuk komunikasi lebih mudah
          </p>
        </div>

        <div className="flex flex-row justify-start items-start space-x-10 px-5 rounded-2xl mt-10 bg-gray-100 py-8">
          <div className="flex flex-col justify-start items-start w-1/2">
            <h2 className="text-xl font-bold leading-tight">
              Camera Translator sensor
            </h2>
            <p className="text-base mt-4 text-gray-700">
              Deteksi gerakan tangan secara real-time menggunakan AI
            </p>
          </div>

          <ul className="flex flex-col justify-center items-center w-1/2 space-y-5">
            <MainFeatureListItem>Deteksi Ekspresi</MainFeatureListItem>
            <MainFeatureListItem>Gerakan Tubuh</MainFeatureListItem>
            <MainFeatureListItem>Feedback Interaktif</MainFeatureListItem>
          </ul>
        </div>

        <Link
          href="/"
          className="flex flex-row justify-center items-center space-x-10 text-xl px-8 py-3 rounded-full bg-pink-500 text-white mt-20 font-bold"
        >
          Kembali
          <ArrowRight className="ml-5" />
        </Link>
      </div> */}

      {/* Camera Feed */}
      <div className="flex flex-col z-20 justify-start items-start">
        <div className="relative w-[1280px] h-[720px] overflow-hidden rounded-xl bg-black shadow-lg">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900 text-white">
              Loading AI Models &amp; Camera...
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
      </div>

      {/* Gesture Result Card */}
      <div className="h-fit flex flex-col z-20 justify-start items-start bg-gray-100 py-10 px-8 rounded-2xl">
        <h2 className="text-2xl font-semibold">gesture terdeteksi</h2>
        <p className="text-9xl mt-5 text-gray-700 text-center w-full">
          {currentEmoji}
        </p>
        <p className="text-2xl mt-5 text-gray-700 text-center w-full">
          {currentLabel}
        </p>
      </div>
    </div>
  );
}
