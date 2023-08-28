import { MdDirectionsBoat, MdDirectionsBus } from "react-icons/md";
import useSWR from "swr";

export const Ferry: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading: isFerryLoading, data: ferryData } = useSWR(
    "http://localhost:3000/api/ferry",
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
          .filter((time: any) => time > 0)
          .sort(function compare(a: number, b: number) {
            return a - b;
          })
      : [];

  return (
    <>
      <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-500 duration-200 text-white">
        <div className="h-full flex p-6 pr-0 pb-0 rounded-t-2xl">
          <MdDirectionsBoat size={65} />
          <div className=" px-7 flex flex-col justify-center items-end ">
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

        <header className="flex flex-col px-4 items-end justify-center leading-tight w-full rounded-b-2xl">
          <div className=" text-4xl text-right flex flex-col px-2 py-2 pb-6">
            {[...Array(2)].map((_, i) => (
              <div className="flex my-1">
                {/* <h1 className="text-3xl py-2 px-3 rounded-lg bg-blue-600 font-bold">
                  Q102
                </h1> */}
                <h1 className="ml-4 pr-2 py-2" key={i}>
                  {ferryMinutes?.at(i + 1) > 59
                    ? ""
                    : ferryMinutes?.at(i + 1) + " min"}
                </h1>
              </div>
            ))}
          </div>
        </header>
      </article>
    </>
  );
};
