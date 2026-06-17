import Link from 'next/link';
import heroBg from '@/assets/hero-background.png';
import mascot from '@/assets/mascot.png';
import Image, { StaticImageData } from 'next/image';
import {ArrowRight, Check } from 'lucide-react';
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

import mainFeatureBg from '@/assets/main-feature-bg.jpeg';
import example from '@/assets/example.png';

import testimonialBg from '@/assets/testimonial-bg.png';

import community from '@/assets/testimonial/community.png';
import card from '@/assets/testimonial/card.png';
import console from '@/assets/testimonial/console.png';
import building from '@/assets/testimonial/building.png';

export default function Home() {
  return (
    <main className='max-w-svw'>
      <div className="flex flex-col justify-center items-start w-full max-w-svw mt-10" style={{ backgroundImage: `url(${heroBg.src})`, backgroundRepeat: 'no-repeat', }}>
        <div className='flex flex-row w-full justify-start items-center mt-40 ml-40 max-w-1/2'>
          <div className='flex flex-col justify-center items-start max-w-1/2'>
            <h1 className="text-6xl font-semibold text-green-600">TAMANASA</h1>
            <p className="text-xl mt-2">Platform interaktif untuk anak tunawicara berbasis kearifan lokal Indonesia.</p>
            <Link href="/translator" className="flex flex-row justify-center items-center space-x-10 text-xl px-8 py-5 rounded-full bg-pink-500 text-white mt-7 font-bold">Camera Translator<ArrowRight /></Link>
          </div>
          <div>
            <Image src={mascot} alt="Hero Background" className='h-full w-full' />
          </div>
        </div>
        <div className="flex flex-row w-fit justify-center items-start bg-white rounded-4xl py-10 px-30 space-x-15 mt-10 shadow-xl mx-auto">
          <FeatureCard title="Komunikasi Visual" description="Belajar simbol dan gambar" icon={<Image src={visualCommunication} alt="Visual Communication" width={80} height={80} />} />
          <FeatureCard title="Pembelajaran Interaktif" description="Materi Bisindo untuk anak anak" icon={<Image src={interactiveLearn} alt="Interactive Learning" width={80} height={80} />} />
          <FeatureCard title="Gamifikasi Tradisional" description="Belajar sambil mengenal budaya" icon={<Image src={traditionalGamification} alt="Traditional Gamification" width={80} height={80} />} />
          <FeatureCard title="Sensor Kamera" description="Deteksi gerakan & ekspresi interaktif" icon={<Image src={sensorCamera} alt="Sensor Camera" width={80} height={80} />} />
          <FeatureCard title="Untuk Semua Umur" description="Anak, guru, orang tua,dan terapis" icon={<Image src={forAll} alt="For All" width={80} height={80} />} />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-full max-w-svw mt-30 space-y-20'>
        <div className='flex flex-col justify-center items-center w-full max-w-1/2'>
          <h1 className="text-3xl font-semibold">Belajar & Komunikasi</h1>
          <p className="text-xl mt-2">Materi intensif sesuai kebutuhan anak</p>
        </div>
        <div className="flex flex-row justify-center items-center space-x-10 w-full">
          <AdvantageCard title="Meningkakan kemampuan anak" icon={<Image src={book} alt="Book" height={130} />} bgColorClass="bg-yellow-400" />
          <AdvantageCard title="Kebutuhan sehari-hari" icon={<Image src={weather} alt="Weather" height={130} />} bgColorClass="bg-blue-500" />
          <AdvantageCard title="Pelajaran Bahasa Indonesia" icon={<Image src={clap} alt="Clap" height={130} />} bgColorClass="bg-teal-500" />
          <AdvantageCard title="Tempat & Lingkungan" icon={<Image src={house} alt="House" height={130} />} bgColorClass="bg-rose-500" />
          <AdvantageCard title="Kegiatan & Pantauan anak" icon={<Image src={walk} alt="Walk" height={130} />} bgColorClass="bg-sky-300" />
          <AdvantageCard title="Cerita Bergambar" icon={<Image src={picture} alt="Picture" height={130} />} bgColorClass="bg-purple-600" />
        </div>
      </div>
      <div
  className="relative flex flex-row w-fit mx-auto shadow-2xl rounded-2xl p-10 mt-30 overflow-hidden space-x-10"
>
  {/* Background Image */}
  <div
    className="absolute z-0 inset-0 bg-cover bg-no-repeat opacity-30 pointer-events-none"
    style={{ backgroundImage: `url(${mainFeatureBg.src})` }}
  />

  {/* Optional white overlay */}
  <div className="absolute z-20 inset-0 bg-white/10 pointer-events-none" />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-start items-start w-fit">
    <div className="flex flex-col justify-start items-start w-fit">
      <h1 className="text-4xl font-semibold">Fitur Unggulan</h1>
      <p className="text-xl mt-2 text-gray-700">
        Teknologi interaktif untuk komunikasi lebih mudah
      </p>
    </div>

    <div className="flex flex-row justify-start items-start space-x-10 px-5 rounded-2xl mt-10 bg-gray-100 py-8">
      <div className="flex flex-col justify-start items-start w-1/2 ">
        <h1 className="text-xl font-bold leading-tight ">
          Camera Translator sensor
        </h1>
        <p className="text-base mt-4 text-gray-700">
          Teknologi interaktif untuk komunikasi lebih mudah
        </p>
      </div>

      <ul className="flex flex-col justify-center items-center w-1/2 space-y-5">
        <MainFeatureListItem>Deteksi Ekspresi</MainFeatureListItem>
        <MainFeatureListItem>Gerakan Tubuh</MainFeatureListItem>
        <MainFeatureListItem>Feedback Interaktif</MainFeatureListItem>
      </ul>
    </div>

    <Link
      href="/translator"
      className=" flex flex-row justify-center items-center space-x-10 text-xl px-8 py-3 rounded-full bg-pink-500 text-white mt-20 font-bold"
    >
      Mulai
      <ArrowRight className="ml-5" />
    </Link>
  </div>
  <div className="flex flex-col z-20 justify-start items-start ">
    <Image src={example} alt="Example" className='h-full' />
  </div> 
  <div className="h-fit flex flex-col z-20 justify-start items-start bg-gray-100 py-10 px-8 rounded-2xl">
    <h1 className="text-2xl font-semibold">gesture terdeteksi</h1>
    <p className="text-9xl mt-5 text-gray-700 text-center w-full">
      👍
    </p>
    <p className="text-2xl mt-5 text-gray-700 text-center w-full">
      Bagus!
    </p>
  </div>
</div>
<div className="relative w-full overflow-hidden mt-30" style={{ backgroundImage: `url(${testimonialBg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-center items-center h-full space-y-25">
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Kata mereka</h1>
      <p className="text-31xl mt-2 text-gray-700">
        Dari teman Tamanasa
      </p>
    </div>
    <div className="flex flex-col justify-center items-center space-y-[150px]">
      <div className="flex flex-row justify-center items-center space-x-10">
      <TestimonialCard name="Ibu ana siti fatimah" subTitle="Orang tua " comment="“Tamanasa sangat membantu anak saya belajar berkomunikasi melalui bisindo dan materi materi yang diajarkan, juga tamanasa memiliki cara yang menyenangkan untuk anka anak belajar”" picture={mascot} />
      <TestimonialCard name="bunda via" subTitle="Orang tua " comment="“Semenjak anak saya memakai Tamanasa untuk berkomunikasi dengan teman temannya, mereka jadi lebih dekat dan anak saya jadi lebih bersemangat pas main sama temen temennya”" picture={mascot} />
      <TestimonialCard name="Kiki kurniawati hamid" subTitle="guru SLB " comment="“Anak-anak sangat suka dengan fitur makera sensornya, mereka selalu bermain menggunakan translator itu dan mereka bisa berkomunikasi dengan lancar”" picture={mascot} />
    </div>
    <div className="flex flex-row justify-center items-center space-x-22 mb-22">
      <TestimonialSummaryCard title="500+" summary='Anak terbantu' icon={community} bgColorClass="bg-blue-500" />
      <TestimonialSummaryCard title="100+" summary='Materi interaktif' icon={card} bgColorClass="bg-green-600" />
      <TestimonialSummaryCard title="500+" summary='Anak terbantu' icon={console} bgColorClass="bg-yellow-500" />
      <TestimonialSummaryCard title="500+" summary='Anak terbantu' icon={building} bgColorClass="bg-rose-500" />
      </div>
    </div>
  </div>
</div>
    </main>
  );
}

function TestimonialSummaryCard({title, summary, icon, bgColorClass}: {title: string, summary: string, icon: StaticImageData, bgColorClass: string}) {
  return (
    <div className={`flex flex-col justify-center items-center space-y-6 rounded-4xl max-w-md px-15 py-10 text-white ${bgColorClass}`}>
      <div className='flex flex-row w-full space-x-9 justify-start items-center'>
        <Image src={icon} width={55} alt="Icon"/>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      <p className="text-2xl px-2">{summary}</p>
    </div>
  );
}

function TestimonialCard({name, subTitle, comment, picture}: {name: string, subTitle: string, comment: string, picture: StaticImageData}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 bg-white rounded-4xl max-w-md shadow-xl p-5">
      <div className='flex flex-row w-full space-x-9 justify-start items-center'>
      <Image src={picture} alt="Mascot" width={100} height={100} />
      <div className='flex flex-col'>
        <h2 className="text-xl font-bold px-2">{name}</h2>
        <p className="text-base px-2">{subTitle}</p>
      </div>
      </div>
      <p className="text-base px-2 text-center">{comment}</p>
    </div>
  );
}

function FeatureCard({title, description, icon}: {title: string, description: string, icon: React.ReactNode}) {
  return (
    <div className="flex flex-col justify-center text-center items-center space-y-2 max-w-[200px]">
      {icon}
      <h2 className="text-xl font-bold px-7">{title}</h2>
      <p className="text-xl px-2">{description}</p>
    </div>
  );
}

function AdvantageCard({title, icon, bgColorClass}: {title: string, icon: React.ReactNode, bgColorClass: string}) {
  return (
    <div className={`py-8 px-4 rounded-3xl flex flex-col justify-center text-center items-center space-y-4 ${bgColorClass} transition-all duration-300 hover:translate-y-[-20px]`}>
      {icon}
      <div className="h-14 flex items-center justify-center">
        <h2 className="text-white text-xl font-bold px-2 max-w-[190px] line-clamp-2">{title}</h2>
      </div>
    </div>
  );
}

function MainFeatureListItem({children}: {children: React.ReactNode}) {
  return (
<li className="flex flex-row justify-start items-center w-full text-lg font-semibold">
  <Check className='w-8 h-8 mr-3 border-2 rounded-full'/>
  {children}
</li>
  );
}