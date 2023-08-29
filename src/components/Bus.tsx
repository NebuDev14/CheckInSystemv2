import { MdDirectionsBus } from "react-icons/md";
import useSWR from "swr";

export const Bus: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading: isBusLoading, data: busData } = useSWR(
    "http://localhost:3000/api/bus",
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  const nextBus = !isBusLoading
    ? (
        (new Date(busData?.time).getTime() - new Date().getTime()) /
        60000
      ).toFixed(0)
    : undefined;

  return (
    <article className="h-full flex flex-col shadow-lg p-2 px-0 rounded-2xl bg-gradient-to-br bg-blue-600 duration-200 text-white ">
      <div className="h-full flex p-6 pr-0 pb-0 pt-16 rounded-t-2xl">
        <MdDirectionsBus size={65} />

        <div className=" px-7 flex flex-col justify-start items-end ">
          {parseInt(nextBus as string) <= 0 ? (
            <h1 className="text-5xl text-right font-semibold">At stop</h1>
          ) : (
            <>
              {" "}
              <h1 className="text-9xl font-bold">{nextBus}</h1>
              <h1 className="text-5xl mb-4">
                minute{parseInt(nextBus as string) !== 1 ? "s" : ""}
              </h1>
            </>
          )}
        </div>
      </div>

      <header className="flex flex-col  justify-center leading-tight w-full rounded-b-2xl">
        <div className="text-5xl text-right flex  py-2 pb-6">
          <h1 className="text-3xl py-2 px-3 rounded-r-lg bg-white text-black font-bold mr-auto">
            Q102
          </h1>
          <h1 className=" pr-2 py-2 ml-4 text-4xl">
            {parseInt(nextBus as string) <= 0
              ? ""
              : busData?.distances.PresentableDistance.replace("les away", "")
                  .replace("away", "")
                  .replace("approaching", "at stop")}
          </h1>
          <h1 className="text-3xl py-2 px-3 rounded-l-lg ml-4 bg-white" />
        </div>
      </header>
    </article>
  );
};
