import { MdDirectionsBoat } from "react-icons/md";

export const FerryBus: React.FC = () => {

    return (
        <article className="h-full flex col-span-2 flex-col shadow-lg p-2 rounded-2xl ferry-loop duration-200 text-white">
            <div className="h-full px-4 rounded-t-2xl py-6">
                <h1 className="text-white font-semibold font-inter ">
                    <MdDirectionsBoat size={65} />
                </h1>
            </div>

            <header className="flex flex-col items-center justify-center leading-tight w-full rounded-b-2xl ">
                <div className="pb-6">
                    <div className="flex items-center items pr-2 py-2 ">
                        <div className="mr-auto border-r-2 flex flex-col justify-center items-center px-7 border-r-zinc-300">
                            <h1 className="text-9xl font-bold">9</h1>
                            <h1 className="text-5xl mb-4">minutes</h1>
                        </div>
                        <div className="ml-8 text-4xl text-right font-semibold flex flex-col items-end justify-center">
                            <h1 className=" pr-2 py-2">4:25 AM</h1>
                            <h1 className=" pr-2 py-2">11:55 AM</h1>
                        </div>
                    </div>
                </div>
            </header>
        </article>
    );
}
