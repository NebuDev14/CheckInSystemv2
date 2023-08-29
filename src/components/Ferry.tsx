import { MdDirectionsBoat, MdDirectionsBus } from "react-icons/md";
import useSWR from "swr";

function convertTime(currMin: number, rawTime: string): number {
  return (
    parseInt(rawTime?.split(":")[0]) * 60 +
    parseInt(rawTime?.split(":")[1]) -
    currMin
  );
}

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
  const filtered = ferryData?.filter(
    (stop: any) => convertTime(currMinutes, stop.time) > 0
  );

  return (
    <div className="rounded-2xl bg-cyan-500 duration-200 text-white">
      <div className="flex justify-end">
        <div
          className={` inline-flex rounded-tr-2xl rounded-bl-2xl ml-auto justify-end px-6 py-3 text-3xl font-semibold ${
            filtered
              ?.at(0)
              ?.destination.replace("Wall St./", "")
              .replace("St", "") === "Pier 11"
              ? "bg-[#F55D5D]"
              : "bg-[#2BA84F]"
          }`}
        >
          {filtered
            ?.at(0)
            ?.destination.replace("Wall St./", "")
            .replace("St", "")}
        </div>
      </div>
      <article className="flex flex-col shadow-lg p-2 pt-0 px-0 ">
        <div className="h-full flex p-6 pr-0 pt-5 pb-0 rounded-t-2xl">
          <MdDirectionsBoat size={65} />
          <div className=" px-7 ml-auto flex flex-col justify-center items-end ">
            <h1 className="text-9xl font-bold">
              {convertTime(currMinutes, filtered?.at(0)?.time) > 59
                ? (
                    convertTime(currMinutes, filtered?.at(0)?.time) / 60
                  ).toFixed(0)
                : convertTime(currMinutes, filtered?.at(0)?.time)}
            </h1>
            <h1 className="text-5xl mb-8">
              {convertTime(currMinutes, filtered?.at(0)?.time) > 59
                ? `hour${
                    convertTime(currMinutes, filtered?.at(0)?.time) !== 1
                      ? "s"
                      : ""
                  }`
                : `minute${
                    convertTime(currMinutes, filtered?.at(0)?.time) !== 1
                      ? "s"
                      : ""
                  }`}
            </h1>
          </div>
        </div>

        <header className="flex flex-col justify-center leading-tight w-full rounded-b-2xl">
          <div className=" text-4xl text-right flex flex-col pt-0 pb-6">
            {[...Array(2)].map((_, i) => (
              <div className="flex my-2">
                <div className="flex  mr-auto items-center justify-center">
                  <h1
                    className={`text-2xl py-2 px-3 rounded-r-lg mr-auto ${
                      filtered
                        ?.at(i + 1)
                        ?.destination.replace("Wall St./", "")
                        .replace("St", "") === "Pier 11"
                        ? "bg-[#F55D5D] pr-6"
                        : "bg-[#56c847]"
                    }  `}
                  >
                    {filtered
                      ?.at(i + 1)
                      ?.destination.replace("Wall St./", "")
                      .replace("St", "")
                      .replace("th", "")}
                  </h1>
                </div>
                <h1 className="py-2" key={i}>
                  {convertTime(currMinutes, filtered?.at(i + 1)?.time) > 59
                    ? ""
                    : convertTime(currMinutes, filtered?.at(i + 1)?.time) +
                      " min"}
                </h1>
                <h1
                  className={`text-3xl py-2 px-3 rounded-l-lg ml-4  ${
                    filtered
                      ?.at(i + 1)
                      ?.destination.replace("Wall St./", "")
                      .replace("St", "") === "Pier 11"
                      ? "bg-[#F55D5D]"
                      : "bg-[#56c847]"
                  }  `}
                />
              </div>
            ))}
          </div>
        </header>
      </article>
    </div>
  );
};
