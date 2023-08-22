import Image from "next/image";
import { Inter } from "next/font/google";
import { FaTram } from "react-icons/fa";
import { IoMdTrain } from "react-icons/io";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen   ${inter.className}`}>
      <div className="bg-zinc-900 flex items-center justify-center py-6">
        <Image src={"/trace.svg"} alt="logo" width={320} height={320} />
      </div>
      <div className="grid grid-rows-3 gap-10 w-full py-8 px-4">
        <article className="h-full flex  shadow-lg rounded-2xl border-zinc-800">
          <div className="h-full px-6 py-16 bg-red-500 rounded-l-2xl">
            <h1 className="block w-full text-4xl  text-white font-semibold font-inter">
              <FaTram />
            </h1>
          </div>

          <header className="flex py-3 px-3 leading-tight w-full rounded-r-2xl bg-zinc-100 md:p-4">
            <h1 className="font-semibold pb-2 text-lg">
              Roosevelt Island Tram
            </h1>
          </header>
        </article>
        <article className="h-full flex flex-row-reverse  shadow-lg rounded-2xl border-zinc-800">
          <div className="h-full px-6 py-16 bg-orange-500 rounded-r-2xl text-right">
            <h1 className=" w-full text-4xl text-white font-semibold font-inter flex items-center justify-center">
              <IoMdTrain />
            </h1>
          </div>

          <header className="flex justify-end py-3 px-3 leading-tight w-full rounded-l-2xl  bg-zinc-100 md:p-4">
            <h1 className="font-semibold pb-2 text-lg">
              Lexington Ave. & 63rd St
            </h1>
          </header>
        </article>
      </div>
    </main>
  );
}
