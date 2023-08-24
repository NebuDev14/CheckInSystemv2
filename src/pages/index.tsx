import Image from "next/image";
import { Inter } from "next/font/google";
import { FaTram, FaBus } from "react-icons/fa";
import { MdDirectionsBoat } from "react-icons/md";
import { Trains } from "@/components/Trains";
import useSWR from "swr";
import { Time } from "@/components/Time";

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
        .sort(function compare(a: number, b: number) {
          return a - b;
        })
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
          <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl tram-loop duration-200 text-white">
            <div className="h-full flex p-6 pr-0 pb-0 rounded-t-2xl">
              <h1 className="text-white mr-auto font-semibold font-inter ">
                <FaTram size={65} />
              </h1>
              <div className=" px-7 flex flex-col justify-center items-end ">
                <h1 className="text-9xl font-bold">
                  {tramMinutes[0] > 59
                    ? (tramMinutes[0] / 60).toFixed(0)
                    : tramMinutes[0]}
                </h1>
                <h1 className="text-5xl mb-4">
                  {tramMinutes[0] > 59
                    ? `hour${tramMinutes[0] !== "1" ? "s" : ""}`
                    : `minute${tramMinutes[0] !== 1 ? "s" : ""}`}
                </h1>
              </div>
            </div>

            <header className="flex flex-col px-4 items-end justify-center leading-tight w-full rounded-b-2xl">
              <div className=" text-5xl text-right font-semibold flex flex-col px-2 py-2 pb-6">
                {[...Array(2)].map((_, i) => (
                  <h1 className=" pr-2 py-2" key={i}>
                    {new Date(
                      new Date().getTime() + tramMinutes[i + 1] * 60000
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      hour12: true,
                      minute: "2-digit",
                    })}
                  </h1>
                ))}
              </div>
            </header>
          </article>
          <article className="h-full flex col-span-2 flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
            <div className="h-full px-4 rounded-t-2xl py-6">
              <h1 className="text-white font-semibold font-inter ">
                <MdDirectionsBoat size={65} />
              </h1>
            </div>

            <header className="flex flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
              <div className="pb-6">
                <div className="flex items-center items pr-2 py-2 ">
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

        <div className="grid grid-cols-3 gap-8 mt-2 mb-8">
          <Time />
          <div className="  ">qr code</div>
        </div>

        {/* <div className="grid grid-cols-3 gap-4 mt-2 mb-8">
          <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl tram-loop duration-200 text-white">
            <div className="h-full flex p-6 pr-0 pb-0 rounded-t-2xl">
              <h1 className="text-white mr-auto font-semibold font-inter ">
                <FaTram size={65} />
              </h1>
              <div className=" px-7 flex flex-col justify-center items-end ">
                <h1 className="text-9xl font-bold">{tramMinutes[0]}</h1>
                <h1 className="text-5xl mb-4">{`minute${tramMinutes[0] !== 1 ? 's' : ''}`}</h1>
              </div>
            </div>

            <header className="flex flex-col px-4 items-end justify-center leading-tight w-full rounded-b-2xl">
              <div className=" text-5xl text-right font-semibold flex flex-col px-2 py-2 pb-6">
                {[...Array(2)].map((_, i) => (
                  <h1 className=" pr-2 py-2" key={i}>{new Date(new Date().getTime() + tramMinutes[i + 1] * 60000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    hour12: true,
                    minute: "2-digit"
                  })}</h1>
                ))}
              </div>
            </header>
          </article>
          <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
            <div className="h-full flex p-6 pr-0 pb-0 rounded-t-2xl">
              <h1 className="text-white mr-auto font-semibold font-inter ">
                <MdDirectionsBoat size={65} />
              </h1>
              <div className=" px-7 flex flex-col justify-center items-end ">
                <h1 className="text-9xl font-bold">9</h1>
                <h1 className="text-5xl mb-4">{`minute${tramMinutes[0] !== 1 ? 's' : ''}`}</h1>
              </div>
            </div>

            <header className="flex flex-col px-4 items-end justify-center leading-tight w-full rounded-b-2xl">
              <div className=" text-5xl text-right font-semibold flex flex-col px-2 py-2 pb-6">
                {[...Array(2)].map((_, i) => (
                  <h1 className=" pr-2 py-2" key={i}>{new Date(new Date().getTime() + tramMinutes[i + 1] * 60000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    hour12: true,
                    minute: "2-digit"
                  })}</h1>
                ))}
              </div>
            </header>
          </article>
          <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 duration-200 text-white">
            <div className="h-full flex p-6 pr-0 pb-0 rounded-t-2xl">
              <h1 className="text-white mr-auto font-semibold font-inter ">
                <FaBus size={65} />
              </h1>
              <div className=" px-7 flex flex-col justify-center items-end ">
                <h1 className="text-9xl font-bold">3</h1>
                <h1 className="text-5xl mb-4">{`minute${tramMinutes[0] !== 1 ? 's' : ''}`}</h1>
              </div>
            </div>

            <header className="flex flex-col px-4 items-end justify-center leading-tight w-full rounded-b-2xl">
              <div className=" text-5xl text-right font-semibold flex flex-col px-2 py-2 pb-6">
                {[...Array(2)].map((_, i) => (
                  <h1 className=" pr-2 py-2" key={i}>{new Date(new Date().getTime() + tramMinutes[i + 1] * 60000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    hour12: true,
                    minute: "2-digit"
                  })}</h1>
                ))}
              </div>
            </header>
          </article>
        </div> */}
      </div>
    </main>
  );
}
