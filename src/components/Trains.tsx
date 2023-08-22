import { IoMdTrain } from "react-icons/io";
import { Stop } from "@/pages";
import Image from "next/image";

export const Trains: React.FC<{ trains: Stop[] }> = ({ trains }) => {
  const sortedTrains = trains.sort(function (a, b) {
    return a.time.getTime() - b.time.getTime();
  });

  return (
    <div>
      <article className="h-full flex flex-row-reverse  shadow-lg rounded-2xl border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-orange-500 rounded-r-2xl">
          <h1 className=" text-4xl text-white font-semibold font-inter ">
            <IoMdTrain size={40} />
          </h1>
        </div>

        <header className="flex flex-col justify-end py-3 pl-4 pr-2 leading-tight w-full rounded-l-2xl  bg-zinc-100 ">
          <h1 className="font-bold pb-2 text-lg text-center mt-1 ">
            Lexington Av. & 59th St
          </h1>
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="flex flex-col items-center text-center justify-start border-r-2 border-r-zinc-300">
              <h1 className=" mb-4">Uptown / Queens</h1>
              {sortedTrains
                .filter(
                  (train) =>
                    train.headSign.includes("Queens") ||
                    train.headSign.includes("Uptown")
                )
                .slice(0, 4)
                .map((train, i) => (
                  <div className="grid grid-cols-3 gap-2 mb-3" key={i}>
                    <div className="flex items-center justify-start">
                      <Image
                        src={`/trains/${train.train}.svg`}
                        alt={`${train.train} symbol`}
                        width={22}
                        height={22}
                        className="w-1/2"
                      />
                    </div>
                    <h1 className="-ml-6 text-sm flex items-center justify-center">
                      {train.destination.substring(0, 6) + "..."}
                    </h1>
                    <h1 className="-ml-3 text-sm font-bold flex items-center justify-center">
                      {train.time
                        .toLocaleTimeString("en-US")
                        .substring(
                          0,
                          (train.time.getHours() >= 10 &&
                            train.time.getHours() <= 12) ||
                            train.time.getHours() >= 22
                            ? 5
                            : 4
                        )}
                    </h1>
                  </div>
                ))}
            </div>

            <div className="flex flex-col items-center text-center justify-start ">
              <h1 className=" mb-4">Downtown</h1>
              {sortedTrains
                .filter((train) => train.headSign.includes("Downtown"))
                .slice(0, 4)
                .map((train, i) => (
                  <div className="grid h-full grid-cols-3 gap-2 mb-3" key={i}>
                    <div className="flex items-center justify-start">
                      <Image
                        src={`/trains/${train.train}.svg`}
                        alt={`${train.train} symbol`}
                        width={22}
                        height={22}
                        className="w-1/2"
                      />
                    </div>
                    <h1 className="-ml-6 text-sm flex items-center justify-center">
                      {train.destination.substring(0, 6) + "..."}
                    </h1>
                    <h1 className="-ml-3 text-sm font-bold flex items-center justify-center">
                      {train.time
                        .toLocaleTimeString("en-US")
                        .substring(
                          0,
                          (train.time.getHours() >= 10 &&
                            train.time.getHours() <= 12) ||
                            train.time.getHours() >= 22
                            ? 5
                            : 4
                        )}
                    </h1>
                  </div>
                ))}
            </div>
          </div>
        </header>
      </article>
    </div>
  );
};
