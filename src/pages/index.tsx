import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex  min-h-screen flex-col  ${inter.className}`}>
      <div className="bg-zinc-900 flex items-center justify-center py-6">
        <Image src={"/trace.svg"} alt="logo" width={320} height={320} />
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="">
          <h1>Hello</h1>
        </div>
      </div>
    </main>
  );
}
