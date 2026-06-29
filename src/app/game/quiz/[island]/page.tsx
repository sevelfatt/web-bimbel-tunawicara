"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Compass, CheckCircle2, XCircle, ArrowRight, Award, RotateCcw } from "lucide-react";
import quizData from "@/data/quiz-questions.json";

// Type definitions based on JSON structure
interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface IslandData {
  title: string;
  questions: Question[];
}

type QuizKeys = "sumatera" | "jawa" | "kalimantan" | "sulawesi" | "papua";

interface PageProps {
  params: Promise<{ island: string }>;
}

export default function QuizPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const islandKey = resolvedParams.island as QuizKeys;
  
  // Safe access to quiz questions
  const islandInfo: IslandData | undefined = quizData[islandKey];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!islandInfo) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4 animate-bounce">Pulau Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8 font-medium">Maaf, pulau yang Anda pilih tidak tersedia dalam kuis.</p>
        <Link href="/game" className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold shadow-md transition-colors">
          Kembali ke Game
        </Link>
      </div>
    );
  }

  const { title, questions } = islandInfo;
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    // Evaluate correctness
    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    // Jump to the result page (Halaman Benar/Salah)
    setIsChecked(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsChecked(false);
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  // 1. Completion view
  if (isFinished) {
    const finalScorePercent = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl flex-grow flex flex-col justify-center">
        <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Award size={48} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Kuis Selesai!</h1>
          <p className="text-gray-500 mb-6 font-medium">Kuis Budaya Pulau {title}</p>
          
          <div className="bg-gray-55 rounded-2xl p-6 mb-8 max-w-sm mx-auto border border-gray-100">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Skor Kamu</p>
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-6xl font-black text-amber-500">{score}</span>
              <span className="text-2xl text-gray-400 font-bold">/ {questions.length}</span>
            </div>
            <p className="text-sm text-gray-650 mt-3 font-semibold">
              Persentase Kelulusan: <span className={finalScorePercent >= 70 ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>{finalScorePercent}%</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-bold transition-colors flex items-center justify-center gap-2 border border-gray-300 cursor-pointer"
            >
              <RotateCcw size={18} /> Ulangi Kuis
            </button>
            <Link 
              href="/game" 
              className="w-full sm:w-auto px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold transition-colors shadow-md block text-center"
            >
              Pilih Pulau Lain
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Feedback Layout (Halaman Hasil/Feedback Benar/Salah)
  if (isChecked) {
    const isCorrectAnswer = selectedOption === currentQuestion.answer;
    
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl flex-grow flex flex-col justify-center">
        {/* Navigation & Progress info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Compass size={18} className="text-amber-500 animate-spin-slow" />
            <span className="font-semibold text-sm">Status Kuis: {title}</span>
          </div>
          <div className="text-xs font-bold text-gray-550 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-205">
            Evaluasi Pertanyaan {currentQuestionIndex + 1}
          </div>
        </div>

        {/* Progress Bar (Evaluated progress) */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-amber-550 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Evaluation Card Container */}
        <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 mb-6 relative overflow-hidden">
          {/* Main Title Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-full mb-4">
              {isCorrectAnswer ? (
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full">
                  <CheckCircle2 size={48} />
                </div>
              ) : (
                <div className="bg-rose-100 text-rose-600 p-4 rounded-full">
                  <XCircle size={48} />
                </div>
              )}
            </div>
            <h2 className={`text-3xl font-black ${isCorrectAnswer ? "text-emerald-600" : "text-rose-600"}`}>
              {isCorrectAnswer ? "Keren, Jawaban Benar! 🎉" : "Yah, Jawaban Salah... ❌"}
            </h2>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Pertanyaan</p>
              <p className="text-base text-gray-800 font-semibold leading-relaxed">{currentQuestion.question}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-450 uppercase tracking-wide mb-1">Jawaban Kamu</p>
                <p className={`text-sm font-bold ${isCorrectAnswer ? "text-emerald-700" : "text-rose-700"}`}>
                  {selectedOption}
                </p>
              </div>
              
              <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Jawaban yang Benar</p>
                <p className="text-sm font-bold text-emerald-800">
                  {currentQuestion.answer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Next Page */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
        >
          <span>{currentQuestionIndex + 1 === questions.length ? "Lihat Hasil Akhir" : "Jawaban Berikutnya"}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // 3. Question Layout (Halaman Pertanyaan, isChecked === false)
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl flex-grow flex flex-col justify-center">
      {/* Navigation & Progress info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-gray-500">
          <Compass size={18} className="text-amber-500" />
          <span className="font-semibold text-sm">Kuis: Pulau {title}</span>
        </div>
        <div className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
          Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
        </div>
      </div>

      {/* Progress Bar (Current progress before evaluation) */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card Container */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />

        <h2 className="text-xl font-bold text-gray-900 leading-relaxed mb-8">
          {currentQuestion.question}
        </h2>

        {/* Options List */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            
            // Clean selection styles without evaluation feedback
            const optionStyles = isSelected 
              ? "border-amber-500 bg-amber-50/30 text-amber-900 shadow-inner font-semibold cursor-pointer"
              : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/10 cursor-pointer";

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 text-sm font-medium ${optionStyles}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Check Answer Action Button */}
      <button
        onClick={handleCheckAnswer}
        disabled={!selectedOption}
        className={`w-full py-4 rounded-2xl font-bold text-center transition-all shadow-md ${
          selectedOption 
            ? "bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer hover:shadow-lg translate-y-[-2px]" 
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Periksa Jawaban
      </button>
    </div>
  );
}
