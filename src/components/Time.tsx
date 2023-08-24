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
  const size = big ? 100 : 55
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
    <div className=" col-span-2 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-black to-purple-950 text-white h-full">
      <article className="h-full flex items-center justify-center shadow-lg p-2 rounded-2xl duration-200 text-white">
        <header className="flex py-6 flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
          <div className="grid grid-cols-2 py-4 px-2 gap-12">
            <div className="flex items-center justify-center">
              {" "}
              <h1 className="text-7xl font-semibold font-openSans  py-6 px-4">
                {new Date().toLocaleTimeString("en-US", {
                  hour12: true,
                  timeStyle: "short",
                })}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className=" text-4xl">{data?.at(0).desc}</h1>
              {getIcon(data?.at(0).condition, true)}
              <h1 className="mt-6 font-semibold text-6xl">{data?.at(0).temperature}°F</h1>
            </div>
          </div>
        </header>
      </article>
      <div>
        {}
      </div>
    </div>
  );
};
