import { useState, useEffect } from "react";
import { HiArrowLeft, HiArrowRight, HiReply } from "react-icons/hi";
import { useConfigurator } from "@/contexts/Customization";
import { getAllClothes } from "@/lib/dbMethods";

const Configurator = () => {
  const {
    sexSelection,
    setSexSelection,
    maleProducts,
    setMaleProducts,
    femaleProducts,
    setFemaleProducts,
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
    setSelectedPart,
  } = useConfigurator();

  const [partsOptions, setPartsOptions] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({
    HEAD: 0,
    TORSO: 0,
    LEGS: 0,
    FEET: 0,
  });

  useEffect(() => {
    if (sexSelection) {
      const fetchData = async () => {
        if (sexSelection === "men" && maleProducts) {
          setPartsOptions(maleProducts);
        } else if (sexSelection === "women" && femaleProducts) {
          setPartsOptions(femaleProducts);
        } else {
          try {
            const products = await getAllClothes(sexSelection);

            const newPartsOptions = products.reduce((options, product) => {
              const category = product.clothesCategory.toUpperCase();
              if (!options[category]) {
                options[category] = [];
              }
              const productDetails = {
                name: product.name,
                price: product.price,
                model: product.model,
                colors: product.colors,
              };
              options[category].push(productDetails);
              return options;
            }, {});

            setPartsOptions(newPartsOptions);

            //react context cache
            if (sexSelection === "men") {
              setMaleProducts(newPartsOptions);
            } else if (sexSelection === "women") {
              setFemaleProducts(newPartsOptions);
            }
          } catch (error) {
            console.error("Failed to fetch parts options:", error);
          }
        }
      };

      fetchData();
    }
  }, [sexSelection, femaleProducts, maleProducts]);

  useEffect(() => {
    if (selectedPart && partsOptions[selectedPart]) {
      const selectedItem = partsOptions[selectedPart][selectedIndex[selectedPart]];
      const modelString = selectedItem.model;
      console.log(modelString);
      switch (selectedPart) {
        case "HEAD":
          setHeadItem(modelString);
          break;
        case "TORSO":
          setTorsoItem(modelString);
          break;
        case "LEGS":
          setLegsItem(modelString);
          break;
        case "FEET":
          setFeetItem(modelString);
          break;
        default:
          break;
      }
    }
  }, [selectedIndex, selectedPart, partsOptions]);

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

  const handlePrevItem = () => {
    setSelectedIndex((prevIndex) => {
      const maxIndex = partsOptions[selectedPart].length - 1;
      const newIndex =
        prevIndex[selectedPart] === 0 ? maxIndex : prevIndex[selectedPart] - 1;
      return { ...prevIndex, [selectedPart]: newIndex };
    });
  };

  const handleNextItem = () => {
    setSelectedIndex((prevIndex) => {
      const maxIndex = partsOptions[selectedPart].length - 1;
      const newIndex =
        prevIndex[selectedPart] === maxIndex ? 0 : prevIndex[selectedPart] + 1;
      return { ...prevIndex, [selectedPart]: newIndex };
    });
  };

  return (
    <div className="pointer-events-none absolute right-0 top-0 h-full w-full text-lg text-white">
      <div className="flex h-full w-full items-center justify-end">
        <div className="pointer-events-auto flex h-fit max-h-[75%] w-[40%] flex-col overflow-y-auto rounded-3xl border-2 border-white md:w-[30%] lg:w-[25%]">
          {!sexSelection ? (
            <>
              <button
                onClick={() => setSexSelection("men")}
                className="border-b border-white/60 py-6 text-xl font-bold tracking-wider hover:bg-neutral/25"
              >
                MEN
              </button>
              <button
                onClick={() => setSexSelection("women")}
                className="py-6 text-xl font-bold tracking-wider hover:bg-neutral/25"
              >
                WOMEN
              </button>
            </>
          ) : !partsOptions[selectedPart] ? (
            <>
              <button
                onClick={() => setSexSelection(null)}
                className="flex items-center gap-4 border-b border-white/60 p-4 hover:bg-neutral/25"
              >
                <HiReply size={20} />
                <span>Go Back</span>
              </button>
              {Object.keys(partsOptions).map((part) => (
                <button
                  key={part}
                  onClick={() => setSelectedPart(part)}
                  className="py-6 text-xl font-bold tracking-wider hover:bg-neutral/25"
                >
                  {part}
                </button>
              ))}
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedPart("MENU")}
                className="flex items-center gap-4 border-b border-white/60 p-4 hover:bg-neutral/25"
              >
                <HiReply size={20} />
                <span>Go Back</span>
              </button>

              <div className="px-4">
                <h1 className="mt-2 text-xl font-bold tracking-wider">
                  {selectedPart} ITEMS
                </h1>
                {partsOptions[selectedPart] && (
                  <div className="my-4 ml-2 flex items-center justify-center gap-4">
                    <HiArrowLeft
                      size={25}
                      className="cursor-pointer duration-100 ease-linear hover:scale-110"
                      onClick={handlePrevItem}
                    />
                    {
                      partsOptions[selectedPart][selectedIndex[selectedPart]]
                        .name
                    }
                    <HiArrowRight
                      size={25}
                      className="cursor-pointer duration-100 ease-linear hover:scale-110"
                      onClick={handleNextItem}
                    />
                  </div>
                )}
                <h1 className="text-xl font-bold tracking-wider">
                  {selectedPart} COLORS
                </h1>
                <div className="my-4 ml-2 grid grid-cols-1 place-content-around justify-items-center gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {partsOptions[selectedPart] &&
                    partsOptions[selectedPart][
                      selectedIndex[selectedPart]
                    ].colors?.map((color) => (
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
    className="aspect-square w-12 cursor-pointer rounded-full border-2 duration-100 ease-linear hover:scale-110"
    style={{
      backgroundColor: `${color}`,
      borderColor: color === selectedColor ? `#ffffff` : "#6b7280",
    }}
    onClick={onClick}
  ></div>
);

export default Configurator;
