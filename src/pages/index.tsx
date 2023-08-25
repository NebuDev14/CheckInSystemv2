import Image from "next/image";
import { Inter } from "next/font/google";
import { FaTram, FaBus } from "react-icons/fa"
import { Trains } from "@/components/Trains";
import useSWR from "swr";
import { Time } from "@/components/Time";
import { FerryBus } from "@/components/FerryBus";

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
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center py-6">
        <Image src={"/trace.svg"} alt="logo" width={375} height={375} />
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
        <div className="grid grid-cols-3 gap-6 mt-2 mb-8">
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
              <div className=" text-5xl text-right flex flex-col px-2 py-2 pb-6">
                {[...Array(2)].map((_, i) => (
                  <h1 className=" pr-2 py-2" key={i}>
                    {new Date(
                      new Date().getTime() + tramMinutes[i + 1] * 60000
                    ).toLocaleTimeString("en-US", {
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </h1>
                ))}
              </div>
            </header>
          </article>
          <FerryBus />
        </div>

        <div className="grid grid-cols-12 gap-6 mb-4">

          <Time />
          <div className="flex-col col-span-6 text-white text-4xl flex bg-gradient-to-br pt-6 pb-8 rounded-2xl from-green-500 to-cyan-600 items-center justify-center">
            <h1></h1>
          </div>
          <div className="flex-col col-span-4 flex bg-gradient-to-t pt-6 pb-8 rounded-2xl from-orange-400 to-yellow-500 items-center justify-center">
            <Image
              src={`/visitor.svg`}
              alt="qr code"
              height={275}
              width={275}
              className="rounded-xl mb-8"
            />
            <h1 className="text-white text-center font-semibold font-openSans text-4xl">
              Scan Check In
            </h1>
          </div>

        </div>

      </div>
    </main>
  );
}
