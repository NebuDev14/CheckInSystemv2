import React from "react";
import useSWR from "swr";

export const Calendar: React.FC = () => {
  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading, data } = useSWR(
    "http://localhost:3000/api/calendar",
    fetcher,
    {
      refreshInterval: 1.8e6,
    }
  );

  console.log(data);

  return (
    <div className=" col-span-6 text-4xl text-black rounded-2xl p-8 bg-white shadow-lg border-zinc-400 border  items-center justify-center">
      {/* <h1 className="text-4xl text-red-500 ">
        {dayName[new Date().getDay()].toUpperCase()}
      </h1>
      <h1 className="text-6xl mt-2 mb-4">{new Date().getUTCDate()}</h1> */}
      <div className="flex flex-col">
        {data?.map((event: any) => (
          <div className="flex px-1 my-1">
            <h1>
              {new Date(event.date as string).toLocaleTimeString("en-US", {
                hour12: true,
                timeStyle: "short",
              })}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};
