import { useState } from "react";
import { MdDirectionsBoat, MdDirectionsBus } from "react-icons/md";
import useSWR from "swr";

export const FerryBus: React.FC = () => {

  const [isBus, setIsBus] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading: isFerryLoading, data: ferryData } = useSWR(
    "http://localhost:3000/api/ferry",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );
  const { isLoading: isBusLoading, data: busData } = useSWR(
    "http://localhost:3000/api/bus",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  const currMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const ferryMinutes =
    ferryData && !isFerryLoading
      ? ferryData
          .map(
            (stop: any) =>
              parseInt(stop.time.split(":")[0]) * 60 +
              parseInt(stop.time.split(":")[1]) -
              currMinutes
          )
          .filter((time: number) => time > 0)
          .sort(function compare(a: number, b: number) {
            return a - b;
          })
      : [];

  return (
    <>
      {isBus ? (
        <article className="h-full flex col-span-2 flex-col shadow-lg p-2 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600  duration-200 text-white">
          <div className="">
            <div className="h-full flex  p-6 pr-0 pb-0 rounded-t-2xl">
              <div className="flex flex-col items-center justify-start">
                <MdDirectionsBus size={65} />
                <div className="mt-4">
                  <span className="px-3 text-3xl rounded-lg bg-blue-600 py-2">
                    Q102
                  </span>
                </div>
              </div>

              <div className=" ml-auto px-7 flex flex-col justify-center items-end ">
                <h1 className="text-9xl font-bold">
                  {ferryMinutes[0] > 59
                    ? (ferryMinutes[0] / 60).toFixed(0)
                    : ferryMinutes[0]}
                </h1>
                <h1 className="text-5xl mb-4">
                  {ferryMinutes[0] > 59
                    ? `hour${ferryMinutes[0] !== "1" ? "s" : ""}`
                    : `minute${ferryMinutes[0] !== 1 ? "s" : ""}`}
                </h1>
              </div>
            </div>
          </div>

          <header className="flex flex-col items-start px-4 justify-center leading-tight w-full rounded-b-2xl ">
            <div className="text-3xl pb-6 pr-7 py-2 w-full text-left flex flex-col items-start justify-center">
              {[...Array(2)].map((_, i) => (
                <div className="flex items-center w-full py-2" key={i}>
                  <h1 className="mr-auto px-3 rounded-lg bg-cyan-600 py-2">
                    {ferryData?.at(i + 1).destination}
                  </h1>
                  <h1 className="text-4xl">
                    {new Date(
                      new Date().getTime() + ferryMinutes?.at(i + 1) * 60000
                    ).toLocaleTimeString("en-US", {
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </h1>
                </div>
              ))}
            </div>
          </header>
        </article>
      ) : (
        <article className="h-full flex col-span-2 flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
          <div className="">
            <div className="h-full flex  p-6 pr-0 pb-0 rounded-t-2xl">
              <MdDirectionsBoat size={65} />
              <div className="pt-2">
                <span className={`ml-6 px-3 text-3xl rounded-lg ${ferryData?.at(0).destination.includes("Wall") ? "bg-green-400" : "bg-red-500" } py-2`}>
                  {ferryData?.at(0).destination}
                </span>
              </div>
              <div className=" ml-auto px-7 flex flex-col justify-center items-end ">
                <h1 className="text-9xl font-bold">
                  {ferryMinutes[0] > 59
                    ? (ferryMinutes[0] / 60).toFixed(0)
                    : ferryMinutes[0]}
                </h1>
                <h1 className="text-5xl mb-4">
                  {ferryMinutes[0] > 59
                    ? `hour${ferryMinutes[0] !== "1" ? "s" : ""}`
                    : `minute${ferryMinutes[0] !== 1 ? "s" : ""}`}
                </h1>
              </div>
            </div>
          </div>

          <header className="flex flex-col items-start px-4 justify-center leading-tight w-full rounded-b-2xl ">
            <div className="text-3xl pb-6 pr-7 py-2 w-full text-left flex flex-col items-start justify-center">
              {[...Array(2)].map((_, i) => (
                <div className="flex items-center w-full py-2" key={i}>
                  <h1 className={`mr-auto px-3 rounded-lg ${ferryData?.at(i+1).destination.includes("Wall") ? "bg-green-400" : "bg-red-500" } py-2`}>
                    {ferryData?.at(i + 1).destination}
                  </h1>
                  <h1 className="text-4xl">
                    {new Date(
                      new Date().getTime() + ferryMinutes?.at(i + 1) * 60000
                    ).toLocaleTimeString("en-US", {
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </h1>
                </div>
              ))}
            </div>
          </header>
        </article>
      )}
    </>
  );
};
