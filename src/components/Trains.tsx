import { IoMdTrain } from "react-icons/io";
import { Stop } from "@/pages";

export const Trains: React.FC<{ trains: Stop[] }> = ({ trains }) => {
  return (
    <div>
      <article className="h-full flex flex-row-reverse  shadow-lg rounded-2xl border-zinc-800">
        <div className="h-full px-6 py-16 bg-orange-500 rounded-r-2xl text-right">
          <h1 className=" w-full text-4xl text-white font-semibold font-inter flex items-center justify-center">
            <IoMdTrain />
          </h1>
        </div>

        <header className="flex flex-col justify-end py-3 px-4 leading-tight w-full rounded-l-2xl  bg-zinc-100 ">
          <h1 className="font-semibold pb-2 text-lg text-right mb-3">
            Lexington Av. & 59th St
          </h1>
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-start border-r-2 border-r-zinc-300">
              <h1 className="font-semibold">Uptown / Queens</h1>
            </div>

            <div className="flex flex-col items-center justify-start ">
              <h1 className="font-semibold">Downtown / Manhattan</h1>
            </div>
          </div>
        </header>
      </article>
    </div>
  );
};
