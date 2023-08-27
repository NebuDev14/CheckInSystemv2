import { MdDirectionsBus } from "react-icons/md";
import useSWR from "swr";

export const Bus: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading: isBusLoading, data: busData } = useSWR(
    "http://localhost:3000/api/bus",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return (
    <article className="h-full flex flex-col shadow-lg p-2 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 duration-200 text-white">
      <div className="h-full flex p-6 pr-0 pb-0 rounded-t-2xl">
        <MdDirectionsBus size={65} />
        <div className=" px-7 flex flex-col justify-start items-end ">
          <h1 className="text-9xl font-bold">5</h1>
          <h1 className="text-5xl mb-4">minutes</h1>
        </div>
      </div>

      <header className="flex flex-col px-4 items-end justify-center leading-tight w-full rounded-b-2xl">
        <div className=" text-5xl text-right flex flex-col px-2 py-2 pb-6">
          <h1 className=" pr-2 py-2">3 min</h1>
        </div>
      </header>
    </article>
  );
};
