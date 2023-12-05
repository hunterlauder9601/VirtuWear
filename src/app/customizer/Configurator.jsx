import { useState, useEffect } from "react";
import { HiArrowLeft, HiArrowRight, HiReply } from "react-icons/hi";
import { useConfigurator } from "@/contexts/Customization";
import { getAllClothes } from "@/lib/dbMethods";
import { incrementProductQuantity } from "../products/[id]/serverActions";
import { useRouter } from "next/navigation";

const domain = "http://localhost:3000";

const Configurator = () => {
  const {
    sexSelection,
    setSexSelection,
    maleProducts,
    setMaleProducts,
    femaleProducts,
    setFemaleProducts,
    setHeadItem,
    headSelectedColor,
    setHeadSelectedColor,
    setGlassesItem,
    glassesSelectedColor,
    setGlassesSelectedColor,
    setTorsoItem,
    torsoSelectedColor,
    setTorsoSelectedColor,
    setLegsItem,
    legsSelectedColor,
    setLegsSelectedColor,
    setFeetItem,
    feetSelectedColor,
    setFeetSelectedColor,
    selectedPart,
    setSelectedPart,
  } = useConfigurator();

  const router = useRouter();

  const [partsOptions, setPartsOptions] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({
    HEAD: 0,
    GLASSES: 0,
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
                if (category === "GLASSES" || category === "HEAD") {
                  options[category] = [{ name: "None", model: "0" }];
                } else {
                  options[category] = [];
                }
              }
              const productDetails = {
                id: product.id,
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

      if (Object.keys(partsOptions).length > 0) {
        // Initialize model items for each part category
        Object.keys(partsOptions).forEach((category) => {
          const items = partsOptions[category];
          if (items.length > 0) {
            const modelString = items[0].model;
            switch (category) {
              case "HEAD":
                setHeadItem(modelString);
                break;
              case "GLASSES":
                setGlassesItem(modelString);
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
        });
      }
      setSelectedIndex({
        HEAD: 0,
        GLASSES: 0,
        TORSO: 0,
        LEGS: 0,
        FEET: 0,
      });
      setHeadSelectedColor("");
      setGlassesSelectedColor("");
      setTorsoSelectedColor("");
      setLegsSelectedColor("");
      setFeetSelectedColor("");
    }
  }, [sexSelection, femaleProducts, maleProducts]);

  useEffect(() => {
    if (selectedPart && partsOptions[selectedPart]) {
      const selectedItem =
        partsOptions[selectedPart][selectedIndex[selectedPart]];
      const modelString = selectedItem.model;
      // console.log(modelString);
      switch (selectedPart) {
        case "HEAD":
          setHeadItem(modelString);
          break;
        case "GLASSES":
          setGlassesItem(modelString);
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
      case "GLASSES":
        setGlassesSelectedColor(color);
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

  const resestColorSelect = () => {
    switch (selectedPart) {
      case "HEAD":
        setHeadSelectedColor("");
        break;
      case "GLASSES":
        setGlassesSelectedColor("");
        break;
      case "TORSO":
        setTorsoSelectedColor("");
        break;
      case "LEGS":
        setLegsSelectedColor("");
        break;
      case "FEET":
        setFeetSelectedColor("");
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

  const handleCheckOut = async () => {
    const cartItems = Object.keys(selectedIndex).map((part) => {
      const selectedItem = partsOptions[part][selectedIndex[part]];
      let selectedColor;
      switch (part) {
        case "HEAD":
          selectedColor = headSelectedColor;
          break;
        case "GLASSES":
          selectedColor = glassesSelectedColor;
          break;
        case "TORSO":
          selectedColor = torsoSelectedColor;
          break;
        case "LEGS":
          selectedColor = legsSelectedColor;
          break;
        case "FEET":
          selectedColor = feetSelectedColor;
          break;
        default:
          selectedColor = null;
          break;
      }
      return { id: selectedItem.id, color: selectedColor };
    });

    for (const item of cartItems) {
      if (item.id) {
        await incrementProductQuantity(item.id, item.color);
      }
    }

    router.push("/cart");
  };

  const categoryOrder = ["HEAD", "GLASSES", "TORSO", "LEGS", "FEET"];
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-full text-lg text-white">
        <div className="flex h-full w-full items-center justify-end">
          {!sexSelection && (
            <div className="mr-[15%] -skew-x-2 bg-neutral p-2 text-xl font-bold tracking-widest">
              (WAITING FOR GENDER SELECTION)
            </div>
          )}
          <div
            className="scrollbar scrollbar-thumb-neutral scrollbar-track-white pointer-events-auto flex h-fit max-h-[75%] w-[40%] 
          flex-col overflow-y-auto rounded-l-3xl border-2 border-r-0
          border-white md:w-[30%] lg:w-[25%]"
          >
            {!sexSelection ? (
              <>
                <button
                  onClick={() => {
                    setSexSelection("men");
                    setSelectedPart("MENU2");
                  }}
                  className="border-b border-white/60 py-6 text-xl font-bold tracking-wider hover:bg-neutral/25"
                >
                  MEN
                </button>
                <button
                  onClick={() => {
                    setSexSelection("women");
                    setSelectedPart("MENU2");
                  }}
                  className="py-6 text-xl font-bold tracking-wider hover:bg-neutral/25"
                >
                  WOMEN
                </button>
              </>
            ) : !partsOptions[selectedPart] ? (
              <>
                <button
                  onClick={() => {
                    setSexSelection(null);
                    setSelectedPart("MENU1");
                  }}
                  className="flex items-center gap-4 border-b border-white/60 p-4 hover:bg-neutral/25"
                >
                  <HiReply size={20} />
                  <span>Go Back</span>
                </button>
                <button
                  onClick={() => {
                    handleCheckOut();
                  }}
                  className="py-6 text-xl font-bold tracking-wider text-accent hover:bg-neutral/25"
                >
                  CHECKOUT
                </button>
                {categoryOrder.map(
                  (category) =>
                    partsOptions[category] && (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedPart(category);
                        }}
                        className="py-6 text-xl font-bold tracking-wider hover:bg-neutral/25"
                      >
                        {category}
                      </button>
                    ),
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedPart("MENU2")}
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
                    <div className="my-4 ml-2 flex flex-col items-center justify-between gap-4 lg:flex-row">
                      <HiArrowLeft
                        className="h-6 w-6 cursor-pointer duration-100 ease-linear hover:scale-110"
                        onClick={() => {
                          handlePrevItem();
                          resestColorSelect();
                        }}
                      />
                      <div className="flex w-[80%] justify-center">
                        {
                          partsOptions[selectedPart][
                            selectedIndex[selectedPart]
                          ].name
                        }
                      </div>
                      <HiArrowRight
                        className="h-6 w-6 cursor-pointer duration-100 ease-linear hover:scale-110"
                        onClick={() => {
                          handleNextItem();
                          resestColorSelect();
                        }}
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
                              case "GLASSES":
                                return glassesSelectedColor;
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
                  {partsOptions[selectedPart]?.[selectedIndex[selectedPart]]
                    .id && (
                    <div className="mb-4">
                      <a
                        target="_blank"
                        href={`${domain}/products/${
                          partsOptions[selectedPart]?.[
                            selectedIndex[selectedPart]
                          ].id
                        }`}
                        rel="noopener noreferrer"
                        className="text-xl font-bold tracking-wider underline"
                      >
                        Check Out Real Product
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ColorBox = ({ color, selectedColor, onClick }) => {
  const boxStyle =
    color === ""
      ? {
          backgroundImage: "linear-gradient(to right, black 50%, white 50%)",
          borderColor: color === selectedColor ? `#ffffff` : "#6b7280",
        }
      : {
          backgroundColor: color,
          borderColor: color === selectedColor ? `#ffffff` : "#6b7280",
        };

  return color === "" ? (
    <div className="tooltip tooltip-top" data-tip="Default">
      <div
        className="aspect-square w-12 cursor-pointer rounded-full border-2 duration-100 ease-linear hover:scale-110"
        style={boxStyle}
        onClick={onClick}
      ></div>
    </div>
  ) : (
    <div
      className="aspect-square w-12 cursor-pointer rounded-full border-2 duration-100 ease-linear hover:scale-110"
      style={boxStyle}
      onClick={onClick}
    ></div>
  );
};

export default Configurator;
