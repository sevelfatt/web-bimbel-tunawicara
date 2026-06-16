import GestureDetector from "@/components/GestureDetector";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-8">
      <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-neutral-800 dark:text-white">
        Next.js Gesture Tracker
      </h1>
      <p className="text-neutral-500 mb-6 max-w-md text-center text-sm">
        Flash an Open Palm, Closed Fist, Victory sign (✌️), or Point up to test tracking.
      </p>
      <GestureDetector />
    </main>
  );
}