import { IoMdTrain } from "react-icons/io";

export const Trains: React.FC = () => {
  return (
    <div>
      <article className="h-full flex flex-row-reverse  shadow-lg rounded-2xl border-zinc-800">
        <div className="h-full px-6 py-16 bg-orange-500 rounded-r-2xl text-right">
          <h1 className=" w-full text-4xl text-white font-semibold font-inter flex items-center justify-center">
            <IoMdTrain />
          </h1>
        </div>

        <header className="flex justify-end py-3 px-4 leading-tight w-full rounded-l-2xl  bg-zinc-100 ">
          <h1 className="font-semibold pb-2 text-lg">
            Lexington Av. & 59th St
          </h1>
        </header>
      </article>
    </div>
  );
};
