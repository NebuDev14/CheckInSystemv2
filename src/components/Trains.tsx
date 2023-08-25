import { Stop } from "@/pages";
import Image from "next/image";

export const Trains: React.FC<{
  queens: Stop[];
  manhattan: Stop[];
  nextQueensTime: string;
  nextManhattanTime: string;
}> = ({ queens, manhattan, nextQueensTime, nextManhattanTime }) => {
  
  return (
    <div className="grid grid-cols-2 gap-6 mb-4 mt-2">
      <article className="h-full flex flex-col  shadow-lg rounded-2xl bg-zinc-100 border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-orange-500 rounded-t-2xl">
          <h1 className="py-4 text-white text-8xl font-semibold">QNS</h1>
        </div>

        <header className="flex flex-col items-left justify-center h-full py-3 pl-4 pr-2 leading-tight w-full">
          <div className="flex items-center justify-center flex-col mb-12">
            <h1 className="font-semibold text-[22rem]">{nextQueensTime}</h1>
            <h1 className="text-7xl ">{nextQueensTime ? `minute${nextQueensTime !== "1" ? "s" : ""
              }` : "No trains."}</h1>
          </div>
          {queens.slice(1, 3).map((train, i) => (
            <div className="grid grid-cols-8 mb-3 ml-2" key={i}>
                <Image
                  src={`/trains/${train.train}.svg`}
                  alt={`${train.train} symbol`}
                  width={55}
                  height={55}
                />
              <h1 className="-ml-6 col-span-5  text-3xl mr-4  flex items-center justify-center">
                {train.destination.slice(0, 12) + "..."}
              </h1>
              <h1 className="mr-6 col-span-2 text-5xl font-semibold flex items-end justify-end">
                {((train.time.getTime() - (new Date().getTime())) / 1000 / 60).toFixed(0)} 
                <span className="font-normal text-xl pl-1">min</span>
              </h1>
          </div>
          ))}
        </header>
      </article>
      <article className="h-full flex flex-col  shadow-lg rounded-2xl bg-zinc-100 border-zinc-800">
        <div className="flex items-center justify-center px-6 py-auto bg-orange-500 rounded-t-2xl">
          <h1 className="py-4 text-white text-8xl font-semibold">MHTN</h1>
        </div>

        <header className="flex flex-col items-left justify-center h-full py-3 pl-4 pr-2 leading-tight w-full">
          <div className="flex items-center justify-center flex-col mb-12">
            <h1 className="font-semibold text-[22rem]">{nextManhattanTime}</h1>
            <h1 className="text-7xl ">{nextManhattanTime ? `minute${nextManhattanTime !== "1" ? "s" : ""
              }` : "No trains."}</h1>
          </div>
          {manhattan.slice(1, 3).map((train, i) => (
            <div className="grid grid-cols-8 mb-3 ml-2" key={i}>
              <div className="flex items-center  justify-start">
                <Image
                  src={`/trains/${train.train}.svg`}
                  alt={`${train.train} symbol`}
                  width={55}
                  height={55}
                  className=""
                />
              </div>
              <h1 className="-ml-6 col-span-5  text-3xl mr-4 text-left flex items-center justify-center">
                {train.destination.length > 23 ? train.destination.slice(0, 12) + "..." : train.destination}
              </h1>
              <h1 className="mr-6 col-span-2 text-5xl font-semibold flex items-end justify-end">
                {((train.time.getTime() - (new Date().getTime())) / 1000 / 60).toFixed(0)} 
                <span className="font-normal text-xl pl-1">min</span>
              </h1>
            </div>
          ))}
        </header>
      </article>
    </div>
  );
};
