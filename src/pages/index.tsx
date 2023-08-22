import Image from "next/image";
import { Inter } from "next/font/google";
import { FaTram } from "react-icons/fa";
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
  const { isLoading, data } = useSWR(
    "http://localhost:3000/api/trains",
    fetcher,
    { refreshInterval: 30000 }
  );
  const stops: Stop[] = [];

  if (!isLoading) {
    data.forEach((train: any) =>
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
        <Image src={"/trace.svg"} alt="logo" width={275} height={275} />
      </div>
      <div className="flex flex-col w-full p-4">
        <article className="h-full mb-6 flex  shadow-lg rounded-2xl border-zinc-800">
          <div className="h-full px-6 py-16 bg-red-500 rounded-l-2xl">
            <h1 className="block w-full text-4xl  text-white font-semibold font-inter">
              <FaTram />
            </h1>
          </div>

          <header className="flex flex-col py-3 px-4 leading-tight w-full rounded-r-2xl bg-zinc-100 ">
            <h1 className="font-semibold text-lg mb-3">
              Roosevelt Island Tram
            </h1>
            <div className="grid h-full grid-cols-2 gap-2">
              <div className="flex flex-col items-center justify-center border-r-2 border-r-zinc-300">
                <h1 className="text-5xl font-bold">15</h1>
                <h1 className="text-xl ">minutes</h1>
              </div>
              <div className="px-4 py-2">
                <h1 className="text-lg">6:07 PM</h1>
                <h1 className="text-lg">6:15 PM</h1>
                <h1 className="text-lg ml-6">┋</h1>
              </div>
            </div>
          </header>
        </article>
        <Trains trains={stops} />
      </div>
    </main>
  );
}
