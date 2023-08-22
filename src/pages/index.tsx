import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen   ${inter.className}`}>
      <div className="bg-zinc-900 flex items-center justify-center py-6">
        <Image src={"/trace.svg"} alt="logo" width={320} height={320} />
      </div>
      <div className="grid grid-rows-3 gap-12 w-full py-8 px-8">
        <article className="h-full flex border shadow-xl  border-zinc-800">
          <div className="h-full px-4 py-6 pb-12 ">
            <h1 className="block w-full  mb-4 text-3xl font-semibold font-inte">
              hi
            </h1>
            <p>hello</p>
          </div>

          <header className="flex items-center justify-between p-2 leading-tight w-full  bg-zinc-800 md:p-4">
            <div className="no-underline">Boo</div>
          </header>
        </article>
      </div>
    </main>
  );
}
