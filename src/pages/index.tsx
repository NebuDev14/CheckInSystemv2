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
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading, data: trainData } = useSWR(
    "http://localhost:3000/api/trains",
    fetcher,
    { refreshInterval: 30000 }
  );

  const { data: tramData } = useSWR("http://localhost:3000/api/tram", fetcher, {
    refreshInterval: 4.32e7,
  });

  const stops: Stop[] = [];
  let queensStops: Stop[] = [];
  let manhattanStops: Stop[] = [];

  if (!isLoading) {
    trainData.forEach((train: any) =>
      train.times[0]
        ? train.times.forEach((time: any) => {
            (time.stopHeadsign.includes("Queens") ||
            time.stopHeadsign.includes("Uptown")
              ? queensStops
              : manhattanStops
            ).push({
              train: train.route.shortName,
              headSign: time.stopHeadsign,
              destination: time.tripHeadsign,
              time: new Date(time.arrivalFmt),
            });
          })
        : null
    );
  }

  function sortTime(a: Stop, b: Stop) {
    return a.time.getTime() - b.time.getTime();
  }

  queensStops.sort(sortTime);
  manhattanStops.sort(sortTime);

  return (
    <main className={`min-h-screen  ${inter.className}`}>
      <div className="bg-gradient-to-br from-zinc-900  to-zinc-700 flex items-center justify-center py-6">
        <Image src={"/trace.svg"} alt="logo" width={650} height={650} />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="grid grid-cols-2 gap-8 mt-2 mb-8">
          <article className="h-full mb-6 flex flex-col shadow-lg p-2 rounded-2xl tram-loop duration-200 text-white">
            <div className="h-full px-4 py-2 rounded-t-2xl flex items-center justify-start">
              <h1 className="text-white font-semibold font-inter ">
                <FaTram size={65} />
              </h1>
            </div>

            <header className="flex flex-col px-4 items-center justify-center leading-tight w-full rounded-b-2xl ">
              <div className=" pb-6">
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-8xl font-bold">12</h1>
                  <h1 className="text-4xl mb-4">minutes</h1>
                  <div className="grid grid-cols-2 gap-3">
                    <h1 className="text-2xl pr-2 border-r-2 border-r-zinc-400">
                      9
                    </h1>
                    <h1 className="text-2xl">17</h1>
                  </div>
                </div>
              </div>
            </header>
          </article>
          <article className="h-full mb-6 flex flex-col p-2 shadow-lg rounded-2xl border-zinc-800 ferry-loop text-white">
            <div className="h-full px-4 py-2 rounded-t-2xl flex items-center justify-start">
              <h1 className="text-white font-semibold font-inter ">
                <MdDirectionsBoat size={65} />
              </h1>
            </div>

            <header className="flex flex-col px-4 items-center justify-center leading-tight w-full rounded-b-2xl ">
              <div className=" pb-6">
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-8xl font-bold">9</h1>
                  <h1 className="text-4xl mb-4">minutes</h1>
                  <div className="grid grid-cols-2 gap-3">
                    <h1 className="text-2xl pr-2 border-r-2 border-r-zinc-400">
                      9
                    </h1>
                    <h1 className="text-2xl">17</h1>
                  </div>
                </div>
              </div>
            </header>
          </article>
        </div>
        <Trains
          queens={queensStops}
          manhattan={manhattanStops}
          nextQueensTime={
            queensStops.length !== 0
              ? (
                  Math.abs(
                    new Date().getTime() - queensStops[0].time.getTime()
                  ) /
                  1000 /
                  60
                ).toFixed(0)
              : ""
          }
          nextManhattanTime={
            manhattanStops.length !== 0
              ? (
                  Math.abs(
                    new Date().getTime() - manhattanStops[0].time.getTime()
                  ) /
                  1000 /
                  60
                ).toFixed(0)
              : ""
          }
        />
      </div>
    </main>
  );
}
