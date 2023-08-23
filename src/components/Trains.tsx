import { IoMdTrain } from "react-icons/io";
import { Stop } from "@/pages";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Trains: React.FC<{ trains: Stop[] }> = ({ trains }) => {
  const sortedTrains = trains.sort(function (a, b) {
    return a.time.getTime() - b.time.getTime();
  });

  const [nextTime, setNextTime] = useState<string>(
    sortedTrains.length !== 0
      ? (
          Math.abs(new Date().getTime() - sortedTrains[0].time.getTime()) /
          1000 /
          60
        ).toFixed(0)
      : ""
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNextTime(
        sortedTrains.length !== 0
          ? (
              Math.abs(new Date().getTime() - sortedTrains[0].time.getTime()) /
              1000 /
              60
            ).toFixed(0)
          : ""
      );
    }, 15000);
    return () => clearInterval(interval);
  }, [nextTime]);

  return (
    <div className="grid grid-cols-2 gap-8">
      <article className="h-full flex flex-col shadow-lg rounded-2xl border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-gradient-to-r from-orange-600 to-orange-400 rounded-tl-2xl">
          <h1 className=" py-4 text-6xl text-white font-semibold">QNS</h1>
        </div>

        <header className="flex flex-col justify-center items-center py-3 pl-4 pr-2 leading-tight w-full rounded-bl-2xl  bg-zinc-100 ">
          <div className="flex items-center justify-center flex-col mb-4">
            <h1 className="font-semibold text-[12rem]">{nextTime}</h1>
            <h1 className="text-7xl ">{`minute${
              nextTime !== "1" ? "s" : ""
            }`}</h1>
          </div>
          <div className="flex flex-col items-center text-center justify-start ">
            {sortedTrains
              .filter(
                (train) =>
                  train.headSign.includes("Queens") ||
                  train.headSign.includes("Uptown")
              )
              .slice(1, 3)
              .map((train, i) => (
                <div className="grid grid-cols-3 gap-2 mb-3" key={i}>
                  <div className="flex items-center justify-start">
                    <Image
                      src={`/trains/${train.train}.svg`}
                      alt={`${train.train} symbol`}
                      width={22}
                      height={22}
                      className="w-1/2"
                    />
                  </div>
                  <h1 className="-ml-6 text-sm flex items-center justify-center">
                    {train.destination.substring(0, 6) + "..."}
                  </h1>
                  <h1 className="-ml-3 text-sm font-bold flex items-center justify-center">
                    {train.time
                      .toLocaleTimeString("en-US")
                      .substring(
                        0,
                        (train.time.getHours() >= 10 &&
                          train.time.getHours() <= 12) ||
                          train.time.getHours() >= 22 ||
                          train.time.getHours() === 0
                          ? 5
                          : 4
                      )}
                  </h1>
                </div>
              ))}
          </div>
        </header>
      </article>
      <article className="h-full flex flex-col  shadow-lg rounded-2xl border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-tr-2xl">
          <h1 className="py-4 text-white text-6xl font-semibold">MNHTN</h1>
        </div>

        <header className="flex flex-col justify-end py-3 pl-4 pr-2 leading-tight w-full rounded-br-2xl  bg-zinc-100 ">
          <div className="flex flex-col items-center text-center justify-start ">
            {sortedTrains
              .filter((train) => train.headSign.includes("Manhattan"))
              .slice(0, 4)
              .map((train, i) => (
                <div className="grid h-full grid-cols-3 gap-2 mb-3" key={i}>
                  <div className="flex items-center justify-start">
                    <Image
                      src={`/trains/${train.train}.svg`}
                      alt={`${train.train} symbol`}
                      width={22}
                      height={22}
                      className="w-1/2"
                    />
                  </div>
                  <h1 className="-ml-6 text-sm flex items-center justify-center">
                    {train.destination.substring(0, 6) + "..."}
                  </h1>
                  <h1 className="-ml-3 text-sm font-bold flex items-center justify-center">
                    {train.time
                      .toLocaleTimeString("en-US")
                      .substring(
                        0,
                        (train.time.getHours() >= 10 &&
                          train.time.getHours() <= 12) ||
                          train.time.getHours() >= 22 ||
                          train.time.getHours() === 0
                          ? 5
                          : 4
                      )}
                  </h1>
                </div>
              ))}
          </div>
        </header>
      </article>
    </div>
  );
};
