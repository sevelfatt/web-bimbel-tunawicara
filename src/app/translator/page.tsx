import GestureDetector from "@/components/GestureDetector";


export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full max-w-svw mt-10">
      <h1 className="text-3xl font-bold">Kamera Translator Sensor</h1>
      <p className="text-xl mt-2">Teknologi interaktif untuk komunikasi lebih mudah</p>
      <GestureDetector />
    </main>
  );
}