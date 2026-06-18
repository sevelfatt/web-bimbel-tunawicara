import footerBg from "@/assets/footer-bg.png";
import tamanasaIcon from "@/assets/tamanasa-icon.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-row space-x-20 w-full justify-center items-center min-h-[450px]"
            style={{ backgroundImage: `url(${footerBg.src})` }}
        >
            <div className="flex flex-col justify-center items-start space-y-8 max-w-[300px]">
                <div className="flex flex-col justify-center items-start w-fit space-y-2">
                    <div className="flex flex-row">
                        <Image src={tamanasaIcon} alt="Tamanasa Icon" width={100} height={100} />
                        <div className="flex flex-col justify-center items-left w-fit">
                            <h1 className="text-2xl font-bold">Tamanasa</h1>
                            <p className="text-xl whitespace-nowrap">Teman Anak Nusantara</p>
                        </div>
                    </div>
                    <p className="text-xl pl-5">Platform interaktif untuk mendukung komunikasi dan pembelajaran anak tunawicara berbasis kearifan lokal Indonesia.</p>
                </div>
            </div>
            <div className="flex flex-row space-x-12 justify-center items-start">
                <FooterList title="Navigasi" items={[
                    <Link href="/" key={1}>Beranda</Link>, 
                    <Link href="/translator" key={2}>Translator</Link>, 
                    <Link href="/learn" key={3}>Belajar</Link>, 
                    <Link href="/game" key={4}>Game</Link>, 
                    <Link href="/about" key={5}>Tentang Kami</Link>, 
                    <Link href="/contact" key={6}>Kontak</Link>]} />
                <FooterList title="Fitur" items={["Komunikasi visual", "Belajar interaktif", "Game tradisional", "Sensor kamera"]} />
                <FooterList title="Bantuan" items={[
                    "FAQ",
                    "Panduan penggunaan",
                    "Kebijakan privasi",
                    "Syarat & ketentuan"
                ]} />
                <FooterList title="Kontak" items={[
                    "tamanasa1703@gmail.com",
                    "@tamanasathebis",
                    "+62 822-6082-4471",

                ]} />
            </div>
        </footer>
    );
}

function FooterList({ title, items }: { title: string; items: React.ReactNode[] }) {
    return (
        <div className="flex flex-col justify-center items-start w-fit space-y-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <ul className="flex flex-col justify-center items-start w-fit space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="text-xl">{item}</li>
                ))}
            </ul>
        </div>
    );
}