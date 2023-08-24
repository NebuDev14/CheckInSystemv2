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

  const { isLoading: tramIsLoading, data: tramData } = useSWR(
    "http://localhost:3000/api/tram",
    fetcher,
    {
      refreshInterval: 4.32e7,
    }
  );

  const currMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const tramMinutes = tramData
    ? tramData.times
        .map(
          (time: any) =>
            parseInt(time.split(":")[0]) * 60 +
            parseInt(time.split(":")[1]) -
            currMinutes
        )
        .filter((time: number) => time > 0)
    : [];

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
        <Image src={"/trace.svg"} alt="logo" width={300} height={300} />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="grid grid-cols-2 gap-8 mt-2 mb-8">
          <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl tram-loop duration-200 text-white">
            <div className="h-full px-4 rounded-t-2xl py-6">
              <h1 className="text-white font-semibold font-inter ">
                <FaTram size={65} />
              </h1>
            </div>

            <header className="flex flex-col px-4 items-start justify-center leading-tight w-full rounded-b-2xl ">
              <div className="pb-6">
                <div className="flex items-center items px-2 py-2 ">
                  <div className="mr-auto border-r-2 px-7 flex flex-col justify-center items-center border-r-zinc-300">
                    <h1 className="text-9xl font-bold">{tramMinutes[0]}</h1>
                    <h1 className="text-5xl mb-4">minutes</h1>
                  </div>
                  <div className="ml-8 text-4xl text-right font-semibold flex flex-col items-end justify-center">
                    <h1 className=" pr-2 py-2">9:12 PM</h1>
                    <h1 className=" pr-2 py-2">10:21 PM</h1>
                  </div>
                </div>
              </div>
            </header>
          </article>
          <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
            <div className="h-full px-4 rounded-t-2xl py-6">
              <h1 className="text-white font-semibold font-inter ">
                <MdDirectionsBoat size={65} />
              </h1>
            </div>

            <header className="flex flex-col px-4 items-start justify-center leading-tight w-full rounded-b-2xl ">
              <div className="pb-6">
                <div className="flex items-center items px-2 py-2 ">
                  <div className="mr-auto border-r-2 flex flex-col justify-center items-center px-7 border-r-zinc-300">
                    <h1 className="text-9xl font-bold">9</h1>
                    <h1 className="text-5xl mb-4">minutes</h1>
                  </div>
                  <div className="ml-8 text-4xl text-right font-semibold flex flex-col items-end justify-center">
                    <h1 className=" pr-2 py-2">4:25 AM</h1>
                    <h1 className=" pr-2 py-2">11:55 AM</h1>
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
        <div className="grid grid-cols-3 gap-8 mt-2 mb-8">
          <article className="h-full flex  items-center justify-center  shadow-lg p-2 rounded-2xl tram-loop duration-200 text-white">
            <header className="grid grid-cols-2 px-4 items-center justify-center leading-tight w-full rounded-b-2xl ">
              <div className="text-4xl font-semibold flex flex-col items-center">
                <div className="h-full px-4 flex items-start  justify-start rounded-t-2xl py-6">
                  <h1 className="text-white font-semibold font-inter ">
                    <FaTram size={65} />
                  </h1>
                </div>
                <h1 className=" pr-2 py-2">9:12 PM</h1>
                <h1 className=" pr-2 py-2">10:21 PM</h1>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col -ml-6  items-center items px-2 ">
                  <div className=" px-7 flex flex-col justify-center items-center ">
                    <h1 className="text-9xl font-bold">{tramMinutes[0]}</h1>
                    <h1 className="text-5xl ">min</h1>
                  </div>
                </div>
              </div>
            </header>
          </article>

          <article className="h-full items-center justify-center  shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
            <div className=" px-4 f rounded-t-2xl py-6">
              <h1 className="text-white font-semibold font-inter ">
                <MdDirectionsBoat size={65} />
              </h1>
            </div>
            <header className="grid grid-cols-2 px-4 items-center justify-center leading-tight w-full rounded-b-2xl ">
              <div className="text-4xl font-semibold flex flex-col items-center">
                <h1 className=" pr-2 py-2">9:12 PM</h1>
                <h1 className=" pr-2 py-2">10:21 PM</h1>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col -ml-6  items-center items px-2 ">
                  <div className=" px-7 flex flex-col justify-center items-center ">
                    <h1 className="text-9xl font-bold">{tramMinutes[0]}</h1>
                    <h1 className="text-5xl ">min</h1>
                  </div>
                </div>
              </div>
            </header>
          </article>


          <article className="h-full items-center justify-center  shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
            <div className=" px-4 f rounded-t-2xl pt-4">
              <h1 className="text-white mb-2 font-semibold font-inter ">
                <MdDirectionsBoat size={55} />
              </h1>
            </div>
            <header className="grid grid-cols-2 px-4 items-center justify-center leading-tight w-full rounded-b-2xl ">

              <div className="flex items-center justify-center">
                <div className="flex flex-col -ml-6  items-center items px-2 ">
                  <div className=" px-7 flex flex-col justify-center items-center ">
                    <h1 className="text-9xl font-bold">{tramMinutes[0]}</h1>
                    <h1 className="text-5xl ">min</h1>
                  </div>
                </div>
              </div>
              <div className="text-4xl font-semibold flex flex-col items-center">
                <h1 className=" pr-2 py-2">9:12 PM</h1>
                <h1 className=" pr-2 py-2">10:21 PM</h1>
              </div>
            </header>
          </article>
        </div>
      </div>
    </main>
  );
}
