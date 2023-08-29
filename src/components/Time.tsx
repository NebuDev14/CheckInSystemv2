import {
  BsCloudLightningRain,
  BsCloudRain,
  BsCloudy,
  BsCloudSnow,
  BsCloudSun,
  BsSun,
} from "react-icons/bs";

import { Condition } from "@/pages/api/weather";
import useSWR from "swr";

function getIcon(condition: Condition, big: boolean) {
  const size = big ? 90 : 60;
  switch (condition) {
    case Condition.SUNNY:
      return <BsSun size={size} />;

    case Condition.PARTLY:
      return <BsCloudSun size={size} />;

    case Condition.CLOUDY:
      return <BsCloudy size={size} />;

    case Condition.SNOW:
      return <BsCloudSnow size={size} />;

    case Condition.RAIN:
      return <BsCloudRain size={size} />;

    case Condition.THUNDER:
      return <BsCloudLightningRain size={size} />;
  }
}

export const Time: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { isLoading, data } = useSWR(
    "http://localhost:3000/api/weather",
    fetcher,
    { refreshInterval: 120000 }
  );

  return (
    <div className=" py-6 col-span-2  flex flex-col items-center justify-center rounded-2xl text-black bg-white shadow-lg h-full">
      <article className="h-full flex items-center flex-col justify-center  p-2 rounded-2xl duration-200 ">
        <header className="flex flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
          <div className="flex flex-col items-center justify-center px-2">
            <div className="flex flex-col items-center justify-center">
              {/* <h1 className=" text-4xl text-center mb-1">{data?.at(0).desc}</h1> */}
              {getIcon(data?.at(0).condition, true)}
              <h1 className="mt-6 mb-3 font-semibold text-4xl">
                {data?.at(0).temperature}°F
              </h1>
            </div>
            <div className="flex items-center justify-center">
              {" "}
              <h1 className="text-2xl font-semibold font-openSans">
                {new Date().toLocaleTimeString("en-US", {
                  hour12: true,
                  timeStyle: "short",
                })}
              </h1>
            </div>
          </div>
        </header>
      </article>
      {/* <div className="flex flex-row items-center justify-center mt-3">
        {Array.from(Array(data?.length).keys())
          .slice(1)
          .map((element) => (
            <div
              key={element}
              className={`px-10 flex items-center justify-center flex-col ${
                element !== data?.length - 1 ? "border-r-2 border-zinc-400" : ""
              }`}
            >
              {getIcon(data?.at(element).condition, false)}
              <h1 className="mt-4 text-2xl font-semibold">
                {data?.at(element).temperature}°F
              </h1>
              <h1 className="mt-4 text-xl font-semibold">
                {new Date(
                  new Date().getTime() + element * 3.6e6
                ).toLocaleTimeString("en-US", {
                  hour12: true,
                  hour: "numeric",
                })}
              </h1>
            </div>
          ))}
      </div> */}
    </div>
  );
};
