import { MdDirectionsBoat } from "react-icons/md";

export const FerryBus: React.FC = () => {
  return (
    <article className="h-full flex col-span-2 flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
      <div className="px-4 rounded-t-2xl pt-6 pb-10">
        <h1 className="text-white font-semibold font-inter ">
          <MdDirectionsBoat size={65} />
        </h1>
      </div>

      <header className="flex flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
        <div className="pb-6">
          <div className="flex items-center justify-center items py-2 ">
            <div className="mr-auto flex flex-col justify-center items-center px-12 border-r-2 border-r-zinc-300">
              <h1 className="text-9xl font-bold">9</h1>
              <h1 className="text-5xl ">minutes</h1>
            </div>
            <div className="text-5xl px-12 text-right  flex flex-col items-end justify-center">
              <h1 className=" py-2">4:11 AM</h1>
              <h1 className=" py-2">5:23 AM</h1>
            </div>
          </div>
        </div>
      </header>
    </article>
  );
};
