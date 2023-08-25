import { FaTram, FaBus } from "react-icons/fa";
import useSWR from "swr";

export const Tram: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
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
  return (
    <article className="h-full flex col-span-3 flex-col shadow-lg p-2 rounded-2xl tram-loop duration-200 text-white">
      <div className="px-4 rounded-t-2xl pt-6 pb-10">
        <h1 className="text-white font-semibold font-inter ">
          <FaTram size={65} />
        </h1>
      </div>

      <header className="flex flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
        <div className="pb-6">
          <div className="flex items-center justify-center items py-2 ">
            <div className="mr-auto flex flex-col justify-center items-center px-12 border-r-2 border-r-zinc-300">
              <h1 className="text-9xl font-bold">
                {" "}
                {tramMinutes[0] > 59
                  ? (tramMinutes[0] / 60).toFixed(0)
                  : tramMinutes[0]}
              </h1>
              <h1 className="text-5xl ">
                {tramMinutes[0] > 59
                  ? `hour${tramMinutes[0] !== "1" ? "s" : ""}`
                  : `minute${tramMinutes[0] !== 1 ? "s" : ""}`}
              </h1>
            </div>
            <div className="text-5xl px-12 text-right  flex flex-col items-end justify-center">
              {[...Array(3)].map((_, i) => (
                <h1 className=" py-2" key={i}>
                   {new Date(
                      new Date().getTime() + tramMinutes[i + 1] * 60000
                    ).toLocaleTimeString("en-US", {
                      timeStyle: "short",
                      hour12: true,
                    })}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </header>
    </article>
  );
};
