export const Time: React.FC = () => {
  return (
    <div className=" col-span-2 rounded-2xl bg-purple-950 text-white h-full flex items-center justify-center">
      <h1 className="text-7xl">
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: true,
          minute: "2-digit",
        })}
      </h1>
    </div>
  );
};
