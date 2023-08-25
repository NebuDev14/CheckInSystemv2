import { MdDirectionsBoat } from "react-icons/md";
import useSWR from "swr";

export const FerryBus: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { isLoading, data: ferryData } = useSWR(
    "http://localhost:3000/api/ferry",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );
  const currMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const ferryMinutes =
    ferryData && !isLoading
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
    <article className="h-full flex col-span-2 flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
      <div className="px-4 rounded-t-2xl pt-6 pb-12">
        <div className="text-white flex items-center justify-start font-semibold font-inter ">
          <MdDirectionsBoat size={65} />
        </div>
      </div>

      <header className="flex flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
        <div className="pb-6 ">
          <div className="grid grid-cols-3 items-center justify-center py-2 ">
            <div>
              <div className="mr-auto flex flex-col justify-center items-center ">
                <h1 className="text-9xl font-bold">
                  {" "}
                  {ferryMinutes[0] > 59
                    ? (ferryMinutes[0] / 60).toFixed(0)
                    : ferryMinutes[0]}
                </h1>
                <h1 className="text-5xl mb-8">
                  {" "}
                  {ferryMinutes[0] > 59
                    ? `hour${ferryMinutes[0] !== "1" ? "s" : ""}`
                    : `minute${ferryMinutes[0] !== 1 ? "s" : ""}`}
                </h1>
                <h1 className="text-3xl px-3 py-2 bg-cyan-600 rounded-lg font-normal">
                  {ferryData?.at(0).destination}
                </h1>
              </div>
            </div>
            <div className="text-3xl text-right col-span-2 flex flex-col items-end justify-center">
              {[...Array(2)].map((_, i) => (
                <div className=" flex items-center justify-center py-2" key={i}>

                  <h1 className="font-semibold">
                    {new Date(
                      new Date().getTime() + ferryMinutes?.at(i + 1) * 60000
                    ).toLocaleTimeString("en-US", {
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </h1>

                  <h1 className="ml-6 px-3 rounded-lg bg-cyan-600 py-2">
                    {ferryData?.at(i + 1).destination}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </article>
  );
};
