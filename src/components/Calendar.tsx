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

  console.log(
    new Date(data?.at(0).end).toLocaleTimeString("en-US", {
      hour12: true,
      timeStyle: "short",
    })
  );

  //  max-h-[23rem] overflow-y-hidden
  return (
    <div className="col-span-6 text-4xl text-black rounded-2xl pb-8  bg-white shadow-lg border-zinc-400 border  items-center justify-center">
      <div className="flex flex-col">
        <div className="text-4xl z-50 rounded-t-2xl bg-neutral-500 text-white py-3 flex items-center justify-center">
          <h1>No events.</h1>
        </div>
        <div style={{ transform: `translateY(-${0}px)` }}>
          <div
            className={`flex items-center justify-center px-4 text-red-500 relative z-40`}
            style={{
              top: `${
                3.85 +
                6.75 * (new Date().getHours() + new Date().getMinutes() / 60)
              }rem`,
            }}
          >
            <h1 className="text-2xl font-semibold w-40 ">
              {new Date().toLocaleTimeString("en-US", {
                hour12: true,
                timeStyle: "short",
              })}
            </h1>
            <hr className="  h-1 bg-red-500  border-red-500 border-2 rounded-full p-2  " />
            <hr className="w-full  h-1 bg-gray-100  border-red-500 border-2 rounded  dark:bg-gray-700" />
          </div>
          {/* <div
            className={`flex flex-col bg-violet-800 rounded-xl items-start justify-start p-4 opacity-60 left-[9rem] h-[11.8rem] text-white absolute w-[22rem] z-40`}
            style={{ top: `${4.75 + 6.75 * 15}rem` }}
          >
            <div className="z-50 bg-violet-800">
              <h1 className="opacity-100 text-3xl  ">3:00 PM - 4:45PM</h1>
              <h1 className="opacity-100 text-3xl font-bold ">FLL Coaching</h1>
            </div>
          </div> */}
          {data?.map((event: any, i: number) => (
            <div
              className={`flex flex-col bg-violet-800 rounded-xl items-start justify-start p-4 opacity-60 left-[9rem] text-white absolute w-[22rem] z-40`}
              style={{
                top: `${
                  4.75 +
                  6.75 *
                    (new Date(event.start).getHours() +
                      new Date(event.start).getMinutes() / 60)
                }rem`,
                height: `${
                  6.75 *
                  ((new Date(event.end).getTime() -
                    new Date(event.start).getTime()) /
                    3.6e6)
                }rem`,
              }}
            >
              <div className="z-50 bg-violet-800">
                <h1 className="opacity-100 text-3xl  ">
                  {new Date(event.start)
                    .toLocaleTimeString("en-US", {
                      hour12: true,
                      timeStyle: "short",
                    })
                    .replace(" ", "")}{" "}
                  -{" "}
                  {new Date(event.end)
                    .toLocaleTimeString("en-US", {
                      hour12: true,
                      timeStyle: "short",
                    })
                    .replace(" ", "")}
                </h1>
                <h1 className="opacity-100 mt-2 text-3xl font-bold ">
                  {event.name}
                </h1>
              </div>
            </div>
          ))}

          {[...Array(24)].map((_, i) => (
            <div className="mb-4 flex justify-start pr-4 items-center text-2xl  w-full py-1  text-zinc-500 pl-4">
              <div
                className={`text-right w-24 ${
                  (new Date().getHours() === i &&
                    new Date().getMinutes() < 13) ||
                  (new Date().getHours() === i - 1 &&
                    new Date().getMinutes() > 47)
                    ? "text-white"
                    : ""
                }`}
              >
                {i % 12 === 0 ? "12" : i % 12}
                {i > 11 ? "PM" : "AM"}
              </div>
              <hr className="w-full bo h-1 ml-8 my-4 bg-gray-100 border-2 rounded md:my-10 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
