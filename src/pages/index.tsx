import Image from "next/image";
import { Inter } from "next/font/google";
import { FaTram } from "react-icons/fa";
import { MdDirectionsBoat } from "react-icons/md";
import { Trains } from "@/components/Trains";
import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

export type Stop = {
  train: string;
  destination: string;
  headSign: string;
  time: Date;
};

export default function Home() {
  const fetcher = (url: string) =>
    fetch(url).then((r) => r.json());

  const { isLoading, data: trainData } = useSWR(
    "http://localhost:3000/api/trains",
    fetcher,
    { refreshInterval: 30000 }
  );

  console.log(trainData)

  const { data: tramData } = useSWR(
    "http://localhost:3000/api/tram",
    fetcher,
    { refreshInterval: 4.32E7 }
  )

  const stops: Stop[] = [];

  if (!isLoading) {
    trainData.forEach((train: any) =>
      train.times[0]
        ? stops.push({
          train: train.route.shortName,
          headSign: train.times[0].stopHeadsign,
          destination: train.times[0].tripHeadsign,
          time: new Date(train.times[0].arrivalFmt),
        })
        : null
    );
  }

  return (
    <main className={`min-h-screen   ${inter.className}`}>
      <div className="bg-zinc-900 flex items-center justify-center py-6">
        <Image src={"/trace.svg"} alt="logo" width={650} height={650} />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="grid grid-cols-2 gap-8 mt-4 mb-8">
          <article className="h-full mb-6 flex flex-col shadow-lg rounded-2xl border-zinc-800 bg-red-500">
            <div className="h-full px-4 my-auto  bg-red-500 rounded-t-2xl flex items-center justify-center">
              <h1 className="text-white flex items-center justify-center font-semibold font-inter bg-red-500">
                <FaTram size={45} />
              </h1>
            </div>

            <header className="flex flex-col px-4 items-center justify-center leading-tight w-full rounded-b-2xl bg-zinc-100 ">
              <div className="pt-6">
                <div className="flex flex-col items-center justify-center ">
                  <div className="flex items-center py-2">
                    <h1 className="text-8xl font-bold mb-4 mr-6">15</h1>
                    <h1 className="text-6xl mb-4">minutes</h1>
                  </div>

                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pb-6">
                <h1 className="text-2xl pr-2 border-r-2 border-r-zinc-400">19</h1>
                <h1 className="text-2xl">22</h1>
              </div>
            </header>
          </article>
          <article className="h-full mb-6 flex flex-col shadow-lg rounded-2xl border-zinc-800 bg-cyan-500">
            <div className="h-full px-4 my-auto  bg-cyan-500 rounded-t-2xl flex items-center justify-center">
              <h1 className="text-white flex items-center justify-center font-semibold font-inter bg-cyan-500">
                <MdDirectionsBoat size={45} />
              </h1>
            </div>

            <header className="flex flex-col px-4 items-center justify-center leading-tight w-full rounded-b-2xl bg-zinc-100 ">
              <div className="py-6">
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-8xl font-bold">4</h1>
                  <h1 className="text-4xl mb-4">minutes</h1>
                  <div className="grid grid-cols-2 gap-3">
                    <h1 className="text-2xl pr-2 border-r-2 border-r-zinc-400">9</h1>
                    <h1 className="text-2xl">17</h1>
                  </div>
                </div>
              </div>
            </header>
          </article>
        </div>
        <Trains trains={stops} />
      </div>
    </main>
  );
}
