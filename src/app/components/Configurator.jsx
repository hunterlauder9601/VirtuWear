import React, { useState } from "react";
import { HiArrowLeft, HiArrowRight, HiReply } from "react-icons/hi";

const Configurator = () => {
  const [selectedPart, setSelectedPart] = useState(null);

  const partsOptions = {
    HEAD: { items: ["ItemName"], colors: ["Red", "Blue"] },
    TORSO: { items: ["ItemName"], colors: ["Red", "Blue"] },
    LEGS: { items: ["ItemName"], colors: ["Red", "Blue"] },
    FEET: { items: ["ItemName"], colors: ["Red", "Blue"] },
  };

  return (
    <div className="pointer-events-none absolute right-0 top-0 h-full w-full text-lg">
      <div className="flex h-full w-full items-center justify-end">
        <div className="pointer-events-auto flex h-fit max-h-[75%] w-[40%] flex-col overflow-y-auto rounded-3xl border-2 border-white md:w-[30%] lg:w-[25%]">
          {!selectedPart ? (
            Object.keys(partsOptions).map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className="py-6 text-xl font-bold tracking-wider  hover:bg-neutral/25"
              >
                {part}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() => setSelectedPart(null)}
                className="flex items-center gap-4 p-4 hover:bg-neutral/25"
              >
                <HiReply size={20} />
                <span>Go Back</span>
              </button>

              <div className="px-4">
                <h1 className="mt-2 text-xl font-bold tracking-wider">
                  {selectedPart} ITEMS
                </h1>
                {partsOptions[selectedPart].items.map((item) => (
                  <div className="my-4 ml-2 flex items-center gap-4" key={item}>
                    <HiArrowLeft size={20} />
                    {item}
                    <HiArrowRight size={20} />
                  </div>
                ))}
                <h1 className="text-xl font-bold tracking-wider">
                  {selectedPart} COLORS
                </h1>
                <div className="my-4 ml-2 flex items-center gap-4">
                  {partsOptions[selectedPart].colors.map((color) => (
                    <span key={color}>{color}</span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configurator;
