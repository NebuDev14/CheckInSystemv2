import React from "react";
import useSWR from "swr";
import { useState } from "react";

export const Calendar: React.FC = () => {
  // const [time, setTime] = useState<number>(new Date().);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  // 10.65 - 3.85

  const { isLoading, data } = useSWR(
    "http://localhost:3000/api/calendar",
    fetcher,
    {
      refreshInterval: 1.8e6,
    }
  );
  //  max-h-[23rem] overflow-y-hidden
  return (
    <div className=" col-span-6 text-4xl text-black rounded-2xl pb-8  bg-white shadow-lg border-zinc-400 border  items-center justify-center">
      {/* <h1 className="text-4xl text-red-500 ">
        {dayName[new Date().getDay()].toUpperCase()}
      </h1>
      <h1 className="text-6xl mt-2 mb-4">{new Date().getUTCDate()}</h1> */}
      <div className="flex flex-col">
        {/* {data?.map((event: any) => (
          <div className="flex px-1 my-1">
            <h1>
              {new Date(event.date as string).toLocaleTimeString("en-US", {
                hour12: true,
                timeStyle: "short",
              })}
            </h1>
          </div>
        ))} */}
        <div
          className={`flex items-center justify-center px-4 text-red-500 relative z-50`}
          style={{
            top: `${
              3.85 +
              6.75 * (new Date().getHours() + new Date().getMinutes() / 60)
            }rem`,
          }}
        >
          <h1 className="text-2xl font-semibold w-36 ">
            {new Date().toLocaleTimeString("en-US", {
              hour12: true,
              timeStyle: "short",
            })}
          </h1>
          <hr className="  h-1 ml-2 bg-red-500  border-red-500 border-2 rounded-full p-2  " />
          <hr className="w-full  h-1    bg-gray-100  border-red-500 border-2 rounded  dark:bg-gray-700" />
        </div>
        {[...Array(24)].map((_, i) => (
          <div className="">
            <div className="mb-4 flex justify-start pr-4 items-center text-3xl  w-full py-1  text-zinc-500 pl-4">
              <div
                className={`text-right w-24 ${
                  new Date().getHours() === i ? "text-whit" : ""
                }`}
              >
                {i % 12 === 0 ? "12" : i % 12}
                {i > 11 ? "PM" : "AM"}
              </div>
              <hr className="w-full bo h-1 ml-8 my-4 bg-gray-100 border-2 rounded md:my-10 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
