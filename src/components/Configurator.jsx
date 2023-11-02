import React from "react";
import { HiArrowLeft, HiArrowRight, HiReply } from "react-icons/hi";
import { useConfigurator } from "@/contexts/Customization";


const Configurator = () => {
  const {
    headItem,
    setHeadItem,
    headSelectedColor,
    setHeadSelectedColor,
    torsoItem,
    setTorsoItem,
    torsoSelectedColor,
    setTorsoSelectedColor,
    legsItem,
    setLegsItem,
    legsSelectedColor,
    setLegsSelectedColor,
    feetItem,
    setFeetItem,
    feetSelectedColor,
    setFeetSelectedColor,
    selectedPart,
    setSelectedPart
  } = useConfigurator(); 

  const partsOptions = {
    HEAD: { items: ["ItemName"], colors: ["#683434", "#1a5e1a", "#659994", "#896599", "#ffa500", "#59555b", "#222222", "#ececec"] },
    TORSO: { items: ["Fleece Hoodie"], colors: ["#683434", "#1a5e1a", "#659994", "#896599", "#ffa500", "#59555b", "#222222", "#ececec"] },
    LEGS: { items: ["ItemName"], colors: ["#683434", "#1a5e1a", "#659994", "#896599", "#ffa500", "#59555b", "#222222", "#ececec"] },
    FEET: { items: ["ItemName"], colors: ["#683434", "#1a5e1a", "#659994", "#896599", "#ffa500", "#59555b", "#222222", "#ececec"] },
  };

  const handleColorSelect = (color) => {
    switch (selectedPart) {
      case "HEAD":
        setHeadSelectedColor(color);
        break;
      case "TORSO":
        setTorsoSelectedColor(color);
        break;
      case "LEGS":
        setLegsSelectedColor(color);
        break;
      case "FEET":
        setFeetSelectedColor(color);
        break;
      default:
        break;
    }
  };

  const handleItemSelect = (item) => {
    switch (selectedPart) {
      case "HEAD":
        setHeadItem(item);
        break;
      case "TORSO":
        setTorsoItem(item);
        break;
      case "LEGS":
        setLegsItem(item);
        break;
      case "FEET":
        setFeetItem(item);
        break;
      default:
        break;
    }
  };



  return (
    <div className="pointer-events-none absolute right-0 top-0 h-full w-full text-lg">
      <div className="flex h-full w-full items-center justify-end">
        <div className="pointer-events-auto flex h-fit max-h-[75%] w-[40%] flex-col overflow-y-auto rounded-3xl border-2 border-white md:w-[30%] lg:w-[25%]">
          {!partsOptions[selectedPart] ? (
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
                onClick={() => setSelectedPart("MENU")}
                className="flex items-center gap-4 p-4 hover:bg-neutral/25"
              >
                <HiReply size={20} />
                <span>Go Back</span>
              </button>

              <div className="px-4">
                <h1 className="mt-2 text-xl font-bold tracking-wider">
                  {selectedPart} ITEMS
                </h1>
                {partsOptions[selectedPart] && partsOptions[selectedPart].items.map((item) => (
                  <div
                    className='my-4 ml-2 flex items-center gap-4'
                    key={item}
                    onClick={() => handleItemSelect(item)}
                  >
                    <HiArrowLeft size={25} className='cursor-pointer hover:scale-110 duration-100 ease-linear'/>
                    {item}
                    <HiArrowRight size={25} className='cursor-pointer hover:scale-110 duration-100 ease-linear'/>
                  </div>
                ))}
                <h1 className="text-xl font-bold tracking-wider">
                  {selectedPart} COLORS
                </h1>
                <div className="my-4 ml-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center gap-y-4 place-content-around">
                  {partsOptions[selectedPart] && partsOptions[selectedPart].colors.map((color) => (
                    <ColorBox
                      key={color}
                      color={color}
                      selectedColor={(() => {
                        switch (selectedPart) {
                          case "HEAD":
                            return headSelectedColor;
                          case "TORSO":
                            return torsoSelectedColor;
                          case "LEGS":
                            return legsSelectedColor;
                          case "FEET":
                            return feetSelectedColor;
                          default:
                            return null;
                        }
                      })()}
                      onClick={() => handleColorSelect(color)}
                    />
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

const ColorBox = ({ color, selectedColor, onClick }) => (
  <div
    className="w-12 aspect-square border-2 border-white rounded-full cursor-pointer hover:scale-110 duration-100 ease-linear"
    style={{
      backgroundColor: `${color}`,
      borderColor: color === selectedColor ? `#ffffff` : '#6b7280'
    }}
    onClick={onClick}
  ></div>
);

export default Configurator;
