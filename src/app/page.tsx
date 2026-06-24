'use client';

import Link from 'next/link';
import heroBg from '@/assets/hero-background.png';
import mascot from '@/assets/mascot.png';
import Image, { StaticImageData } from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import visualCommunication from '@/assets/features/visual-communication.png';
import interactiveLearn from '@/assets/features/interactive-learning.png';
import sensorCamera from '@/assets/features/sensor-camera.png';
import traditionalGamification from '@/assets/features/traditional-gamification.png';
import forAll from '@/assets/features/for-all.png';

import clap from '@/assets/advantage/clap.svg';
import walk from '@/assets/advantage/walk.svg';
import picture from '@/assets/advantage/picture.svg';
import book from '@/assets/advantage/book.svg';
import weather from '@/assets/advantage/weather.svg';
import house from '@/assets/advantage/house.svg';

import decoration1 from '@/assets/decoration-1.png';

import mainFeatureBg from '@/assets/main-feature-bg.jpeg';
import example from '@/assets/example.png';

import testimonialBg from '@/assets/testimonial-bg.png';

import community from '@/assets/testimonial/community.png';
import card from '@/assets/testimonial/card.png';
import console from '@/assets/testimonial/console.png';
import building from '@/assets/testimonial/building.png';

import culturalTasa from '@/assets/cultural-tasa.png';
import previewGame from '@/assets/preview-game.png';

import trophy from '@/assets/trophy.svg';

import pelajaranBg from '@/assets/pelajaran-bg.png';
import pelajaran1 from '@/assets/pelajaran-1.png';
import pelajaran2 from '@/assets/pelajaran-2.png';

import tentangMascot from '@/assets/tentang-mascot.png';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className='max-w-svw overflow-x-hidden'>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-start w-full max-w-svw mt-10" 
        style={{ backgroundImage: `url(${heroBg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <div className='flex flex-row w-full justify-start items-center mt-40 ml-40 max-w-1/2'>
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-col justify-center items-start max-w-1/2'
          >
            <h1 className="text-6xl font-semibold text-green-600">TAMANASA</h1>
            <p className="text-xl mt-2">Platform interaktif untuk anak tunawicara berbasis kearifan lokal Indonesia.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/translator" className="flex flex-row justify-center items-center space-x-10 text-xl px-8 py-5 rounded-full bg-pink-500 text-white mt-7 font-bold shadow-lg hover:shadow-pink-500/50 transition-shadow">
                Camera Translator<ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Image src={mascot} alt="Hero Mascot" className='h-full w-full' priority />
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-row w-fit justify-center items-start bg-white rounded-4xl py-10 px-30 space-x-15 mt-10 shadow-xl mx-auto"
        >
          <FeatureCard title="Komunikasi Visual" description="Belajar simbol dan gambar" icon={<Image src={visualCommunication} alt="Visual Communication" width={80} height={80} />} />
          <FeatureCard title="Pembelajaran Interaktif" description="Materi Bisindo untuk anak anak" icon={<Image src={interactiveLearn} alt="Interactive Learning" width={80} height={80} />} />
          <FeatureCard title="Gamifikasi Tradisional" description="Belajar sambil mengenal budaya" icon={<Image src={traditionalGamification} alt="Traditional Gamification" width={80} height={80} />} />
          <FeatureCard title="Sensor Kamera" description="Deteksi gerakan & ekspresi interaktif" icon={<Image src={sensorCamera} alt="Sensor Camera" width={80} height={80} />} />
          <FeatureCard title="Untuk Semua Umur" description="Anak, guru, orang tua,dan terapis" icon={<Image src={forAll} alt="For All" width={80} height={80} />} />
        </motion.div>
      </motion.div>

      {/* Belajar & Komunikasi Section */}
      <div className='flex flex-col justify-center items-center w-full max-w-svw mt-30 space-y-20'>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className='flex flex-col justify-center items-center w-full max-w-1/2'
        >
          <h1 className="text-3xl font-semibold">Belajar & Komunikasi</h1>
          <p className="text-xl mt-2">Materi intensif sesuai kebutuhan anak</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-10 w-full px-10"
        >
          <AdvantageCard title="Meningkakan kemampuan anak" icon={<Image src={book} alt="Book" height={130} />} bgColorClass="bg-yellow-400" />
          <AdvantageCard title="Kebutuhan sehari-hari" icon={<Image src={weather} alt="Weather" height={130} />} bgColorClass="bg-blue-500" />
          <AdvantageCard title="Pelajaran Bahasa Indonesia" icon={<Image src={clap} alt="Clap" height={130} />} bgColorClass="bg-teal-500" />
          <AdvantageCard title="Tempat & Lingkungan" icon={<Image src={house} alt="House" height={130} />} bgColorClass="bg-rose-500" />
          <AdvantageCard title="Kegiatan & Pantauan anak" icon={<Image src={walk} alt="Walk" height={130} />} bgColorClass="bg-sky-300" />
          <AdvantageCard title="Cerita Bergambar" icon={<Image src={picture} alt="Picture" height={130} />} bgColorClass="bg-purple-600" />
        </motion.div>
      </div>

      {/* Fitur Unggulan Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-row w-fit mx-auto shadow-2xl rounded-2xl p-10 mt-30 overflow-hidden space-x-10"
      >
        <div
          className="absolute z-0 inset-0 bg-cover bg-no-repeat opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${mainFeatureBg.src})` }}
        />
        <div className="absolute z-20 inset-0 bg-white/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-start items-start w-fit">
          <div className="flex flex-col justify-start items-start w-fit">
            <h1 className="text-4xl font-semibold">Fitur Unggulan</h1>
            <p className="text-xl mt-2 text-gray-700">Teknologi interaktif untuk komunikasi lebih mudah</p>
          </div>

          <div className="flex flex-row justify-start items-start space-x-10 px-5 rounded-2xl mt-10 bg-gray-100 py-8 shadow-inner">
            <div className="flex flex-col justify-start items-start w-1/2 ">
              <h1 className="text-xl font-bold leading-tight ">Camera Translator sensor</h1>
              <p className="text-base mt-4 text-gray-700">Teknologi interaktif untuk komunikasi lebih mudah</p>
            </div>

            <ul className="flex flex-col justify-center items-center w-1/2 space-y-5">
              <MainFeatureListItem>Deteksi Ekspresi</MainFeatureListItem>
              <MainFeatureListItem>Gerakan Tubuh</MainFeatureListItem>
              <MainFeatureListItem>Feedback Interaktif</MainFeatureListItem>
            </ul>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/translator" className="flex flex-row justify-center items-center space-x-10 text-xl px-8 py-3 rounded-full bg-pink-500 text-white mt-20 font-bold shadow-lg">
              Mulai <ArrowRight className="ml-5" />
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col z-20 justify-start items-center">
          <motion.div
            whileHover={{ rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image src={example} alt="Example" className='h-full rounded-xl shadow-md' />
          </motion.div>
        </div> 

        <motion.div 
          whileHover={{ y: -5 }}
          className="h-fit flex flex-col z-20 justify-start items-start bg-gray-100 py-10 px-8 rounded-2xl shadow-md"
        >
          <h1 className="text-2xl font-semibold">gesture terdeteksi</h1>
          <motion.p 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl mt-5 text-gray-700 text-center w-full"
          >
            👍
          </motion.p>
          <p className="text-2xl mt-5 text-gray-700 text-center w-full">Bagus!</p>
        </motion.div>
      </motion.div>

      {/* Testimonial Section */}
      <div className="relative w-full overflow-hidden mt-30 py-20" style={{ backgroundImage: `url(${testimonialBg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative z-10 flex flex-col justify-center items-center h-full space-y-25">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-row justify-between items-center w-full px-10'
          >
            <Image src={decoration1} alt="Decoration 1" className='h-[70px] w-auto scale-x-[-1]' />
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-5xl font-bold">Kata mereka</h1>
              <p className="text-3xl mt-2 text-gray-700">Dari teman Tamanasa</p>
            </div>
            <Image src={decoration1} alt="Decoration 2" className='h-[70px] w-auto' />
          </motion.div>

          <div className="flex flex-col justify-center items-center space-y-[150px]">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-10"
            >
              <TestimonialCard name="Ibu ana siti fatimah" subTitle="Orang tua" comment="“Tamanasa sangat membantu anak saya belajar berkomunikasi melalui bisindo dan materi materi yang diajarkan, juga tamanasa memiliki cara yang menyenangkan untuk anka anak belajar”" picture={mascot} />
              <TestimonialCard name="bunda via" subTitle="Orang tua" comment="“Semenjak anak saya memakai Tamanasa untuk berkomunikasi dengan teman temannya, mereka jadi lebih dekat dan anak saya jadi lebih bersemangat pas main sama temen temennya”" picture={mascot} />
              <TestimonialCard name="Kiki kurniawati hamid" subTitle="guru SLB" comment="“Anak-anak sangat suka dengan fitur makera sensornya, mereka selalu bermain menggunakan translator itu dan mereka bisa berkomunikasi dengan lancar”" picture={mascot} />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-10 mb-22"
            >
              <TestimonialSummaryCard title="500+" summary='Anak terbantu' icon={community} bgColorClass="bg-blue-500" />
              <TestimonialSummaryCard title="100+" summary='Materi interaktif' icon={card} bgColorClass="bg-green-600" />
              <TestimonialSummaryCard title="500+" summary='Anak terbantu' icon={console} bgColorClass="bg-yellow-500" />
              <TestimonialSummaryCard title="500+" summary='Anak terbantu' icon={building} bgColorClass="bg-rose-500" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Game Section */}
      <div className='flex flex-col justify-center items-center w-full max-w-svw mt-30 space-y-20'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='flex flex-col justify-center items-center w-full max-w-1/2'
        >
          <h1 className="text-5xl font-semibold">Game Tradisional</h1>
          <p className="text-2xl mt-2">Bermain sambil mengenal budaya Indonesia</p>
        </motion.div>

        <div className='flex flex-col space-y-10'>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className='flex flex-row justify-center items-center space-x-2 p-10 rounded-4xl bg-white shadow-2xl overflow-hidden'
          >
            <div className='flex flex-col justify-start items-start'>
              <div>
                <h1 className='text-3xl font-semibold'>Berpetualang Bersama Tasa</h1>
                <p className='text-xl max-w-2/3 mt-4'>Selesaikan misi-misi nya dan kamu akan jadi pemenang</p>
              </div>
              <div className='flex flex-row justify-center items-end space-x-28 mt-10'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/game" className="text-xl px-9 py-4 rounded-full bg-rose-500 text-white font-semibold shadow-md">Lihat semua</Link>
                </motion.div>
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                  <Image src={culturalTasa} alt="Tasa" width={250} height={250} />
                </motion.div>
              </div>
            </div>
            <Image src={previewGame} alt="Preview Game" height={336} className="rounded-2xl" />
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className='flex flex-row bg-purple-500 text-white w-full h-fit py-8 px-10 mx-auto rounded-3xl justify-between items-center shadow-xl'
          >
            <div className='flex flex-row space-x-10 items-center'>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Image src={trophy} alt="Trophy" height={80} />
              </motion.div>
              <div className='flex flex-col'>
                <h1 className="text-3xl font-semibold">Kumpulkan dan Selesaikan Misi!</h1>
                <p className="text-xl opacity-90">Belajar, Bermain, dan Jadi juara!</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/game" className='text-xl px-9 py-4 rounded-full text-black bg-white font-semibold shadow-md'>Lihat prestasi</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pelajaran Section */}
      <div className='flex flex-col justify-center items-center py-72 text-white mt-30' style={{ backgroundImage: `url(${pelajaranBg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className='text-5xl font-semibold'>Pelajaran</h2>
        <p className='text-xl mt-2'>Untuk anak-anak</p>
        <div className='flex flex-row justify-center items-center space-x-10 my-20'>
          <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.95 }}>
            <Image src={pelajaran1} alt="Pelajaran 1" height={425} className='drop-shadow-2xl cursor-pointer' />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.95 }}>
            <Image src={pelajaran2} alt="Pelajaran 2" height={425} className='drop-shadow-2xl cursor-pointer' />
          </motion.div>
        </div>
      </div>

      {/* Tentang Section */}
      <div className='flex flex-row w-fit justify-center items-center mx-auto mt-30 px-20 py-20 bg-green-50/50 rounded-6xl'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="shrink-0"
        >
          <Image src={tentangMascot} alt="Tentang Mascot" height={525} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='flex flex-col ml-20'
        >
          <h1 className='text-5xl font-bold text-green-700'>Tentang Tamanasa</h1>
          <p className='text-2xl mt-9 leading-relaxed text-gray-700'>TAMANASA merupakan website edukasi inklusif yang menggabungkan komunikasi visual, pembelajaran adaptif, dan gamifikasi kearifan lokal untuk membantu anak tunarungu belajar dengan lebih interaktif. Melalui permainan tradisional dan budaya Nusantara, TAMANASA mendukung pendidikan inklusif sekaligus pelestarian budaya Indonesia hingga wilayah 3T.</p>
          <div className='flex flex-row justify-end mx-10 mt-20 opacity-50'>
            <Image src={decoration1} alt="Decoration 1" className='h-[40px] w-fit' />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function TestimonialSummaryCard({ title, summary, icon, bgColorClass }: { title: string, summary: string, icon: StaticImageData, bgColorClass: string }) {
  return (
    <motion.div 
      variants={fadeIn}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`flex flex-col justify-center items-center space-y-6 rounded-4xl max-w-md px-15 py-10 text-white shadow-xl ${bgColorClass} cursor-default`}
    >
      <div className='flex flex-row w-full space-x-9 justify-start items-center'>
        <Image src={icon} width={55} alt="Icon" />
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      <p className="text-2xl px-2 opacity-90">{summary}</p>
    </motion.div>
  );
}

function TestimonialCard({ name, subTitle, comment, picture }: { name: string, subTitle: string, comment: string, picture: StaticImageData }) {
  return (
    <motion.div 
      variants={fadeIn}
      whileHover={{ y: -10 }}
      className="flex flex-col justify-center items-center space-y-6 bg-white rounded-4xl max-w-md shadow-xl p-8 transition-shadow hover:shadow-2xl"
    >
      <div className='flex flex-row w-full space-x-9 justify-start items-center'>
        <Image src={picture} alt="Avatar" width={100} height={100} className="rounded-full bg-gray-100" />
        <div className='flex flex-col'>
          <h2 className="text-xl font-bold px-2 text-gray-800">{name}</h2>
          <p className="text-base px-2 text-pink-500 font-medium">{subTitle}</p>
        </div>
      </div>
      <p className="text-lg px-2 text-center text-gray-600 italic">“{comment.replace(/^[“”]| [“”]$/g, '')}”</p>
    </motion.div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      variants={fadeIn}
      whileHover={{ scale: 1.1, y: -5 }}
      className="flex flex-col justify-center text-center items-center space-y-4 max-w-[200px] group cursor-default"
    >
      <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
        {icon}
      </div>
      <h2 className="text-xl font-bold px-4 text-gray-800">{title}</h2>
      <p className="text-lg px-2 text-gray-600">{description}</p>
    </motion.div>
  );
}

function AdvantageCard({ title, icon, bgColorClass }: { title: string, icon: React.ReactNode, bgColorClass: string }) {
  return (
    <motion.div 
      variants={fadeIn}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        rotate: [0, -1, 1, 0],
        transition: { duration: 0.3 }
      }}
      className={`py-12 px-6 rounded-4xl flex flex-col justify-center text-center items-center space-y-6 ${bgColorClass} shadow-lg cursor-pointer`}
    >
      <div className="hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="h-16 flex items-center justify-center">
        <h2 className="text-white text-xl font-bold px-4 max-w-[190px] leading-tight">{title}</h2>
      </div>
    </motion.div>
  );
}

function MainFeatureListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li 
      whileHover={{ x: 10 }}
      className="flex flex-row justify-start items-center w-full text-lg font-semibold cursor-default text-gray-700"
    >
      <Check className='w-8 h-8 mr-3 border-2 border-green-500 text-green-500 rounded-full p-1' />
      {children}
    </motion.li>
  );
}