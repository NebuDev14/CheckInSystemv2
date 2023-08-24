import { IoMdTrain } from "react-icons/io";
import { Stop } from "@/pages";
import Image from "next/image";

export const Trains: React.FC<{
  queens: Stop[];
  manhattan: Stop[];
  nextQueensTime: string;
  nextManhattanTime: string;
}> = ({ queens, manhattan, nextQueensTime, nextManhattanTime }) => {


  return (
    <div className="grid grid-cols-2 gap-8 mb-4 mt-2">
      <article className="h-full flex flex-col shadow-lg rounded-bl-2xl  bg-zinc-100 border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-gradient-to-r from-orange-600 to-orange-400 rounded-tl-2xl">
          <h1 className=" py-4 text-8xl text-white font-semibold">QNS</h1>
        </div>

        <header className="py-3 pl-4 pr-2 leading-tight w-full flex items-center justify-center h-full  ">
          <div className="flex items-center justify-center flex-col mb-12">
            <h1 className="font-semibold text-[14rem]">{nextQueensTime}</h1>
            <h1 className="text-7xl ">{nextQueensTime ? `minute${
              nextQueensTime !== "1" ? "s" : ""
            }` : "No trains."}</h1>
          </div>

          {queens.slice(1, 3).map((train, i) => (
            <div className="flex items-center mb-3 ml-2" key={i}>
              <div className="flex items-center justify-start">
                <Image
                  src={`/trains/${train.train}.svg`}
                  alt={`${train.train} symbol`}
                  width={55}
                  height={55}
                  className="mr-12"
                />
              </div>
              <h1 className="-ml-6 text-3xl mr-auto flex items-center justify-center">
                {train.destination}
              </h1>
              <h1 className="mr-6 text-3xl font-semibold flex items-center justify-center">
                {train.time
                  .toLocaleTimeString("en-US")
                  .substring(
                    0,
                    (train.time.getHours() >= 10 &&
                      train.time.getHours() <= 12) ||
                      train.time.getHours() >= 22 ||
                      train.time.getHours() === 0
                      ? 5
                      : 4
                  )}
              </h1>
            </div>
          ))}
        </header>
      </article>
      <article className="h-full flex flex-col  shadow-lg rounded-br-2xl bg-zinc-100 border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-tr-2xl">
          <h1 className="py-4 text-white text-8xl font-semibold">MHTN</h1>
        </div>

        <header className="flex flex-col items-center justify-center h-full py-3 pl-4 pr-2 leading-tight w-full   ">
          <div className="flex items-center justify-center flex-col mb-12">
            <h1 className="font-semibold text-[14rem]">{nextManhattanTime}</h1>
            <h1 className="text-7xl ">{nextManhattanTime ? `minute${
              nextManhattanTime !== "1" ? "s" : ""
            }` : "No trains."}</h1>
          </div>
          {manhattan.slice(1, 3).map((train, i) => (
            <div className="flex items-center mb-3 ml-2" key={i}>
              <div className="flex items-center justify-start">
                <Image
                  src={`/trains/${train.train}.svg`}
                  alt={`${train.train} symbol`}
                  width={55}
                  height={55}
                  className="mr-12"
                />
              </div>
              <h1 className="-ml-6 text-3xl mr-4 flex items-center justify-center">
                {train.destination.length > 23 ? train.destination.slice(0, 16) + "..." : train.destination}
              </h1>
              <h1 className="mr-6 text-3xl font-semibold flex items-center justify-center">
                {train.time
                  .toLocaleTimeString("en-US")
                  .substring(
                    0,
                    (train.time.getHours() >= 10 &&
                      train.time.getHours() <= 12) ||
                      train.time.getHours() >= 22 ||
                      train.time.getHours() === 0
                      ? 5
                      : 4
                  )}
              </h1>
            </div>
          ))}
        </header>
      </article>
    </div>
  );
};
