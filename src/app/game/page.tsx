import Link from "next/link";
import { Compass } from "lucide-react";

export default function GamePage() {
  const islands = [
    { id: "sumatera", name: "Sumatera", color: "bg-emerald-500", desc: "Temukan keunikan Rumah Gadang, Senjata Rencong, dan Tari Piring khas Sumatera Barat dan Aceh." },
    { id: "jawa", name: "Jawa", color: "bg-blue-500", desc: "Pelajari Gamelan Jawa, keagungan Rumah Joglo khas Jawa Tengah, serta kisah tokoh Semar." },
    { id: "kalimantan", name: "Kalimantan", color: "bg-amber-500", desc: "Jelajahi keluhuran suku Dayak, Mandau, keindahan Tari Enggang, dan Rumah Betang." },
    { id: "sulawesi", name: "Sulawesi", color: "bg-red-500", desc: "Mengenal Kapal Pinisi khas Bugis, Rumah Tongkonan adat Toraja, dan Tari Paduppa Bosara." },
    { id: "papua", name: "Papua", color: "bg-purple-500", desc: "Singkap keunikan Rumah Honai, musik Tifa yang khas, hingga Tarian Perang tradisional Papua." },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl flex-grow">
      <div className="text-center mb-12 mt-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-linear-to-r from-yellow-500 to-amber-600">
          Game Kuis Budaya Nusantara
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Selamat datang di petualangan kuis budaya Indonesia! Pilih salah satu pulau di bawah ini untuk menguji dan memperluas pengetahuanmu tentang adat dan kebudayaannya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {islands.map((island) => (
          <Link 
            key={island.id} 
            href={`/game/quiz/${island.id}`}
            className="group block bg-white rounded-3xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-amber-300"
          >
            <div className={`w-16 h-16 rounded-2xl ${island.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
              <Compass size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-500 transition-colors">
              Pulau {island.name}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {island.desc}
            </p>
            <div className="mt-8 flex items-center text-amber-500 font-semibold group-hover:translate-x-2 transition-transform text-sm">
              Mulai Kuis →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
