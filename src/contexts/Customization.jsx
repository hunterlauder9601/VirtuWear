import { useState, useContext, createContext } from "react";

// Create a context to manage the states for items and colors
const ConfiguratorContext = createContext();

const ConfiguratorProvider = ({ children }) => {
  const [sexSelection, setSexSelection] = useState(null);

  const [maleProducts, setMaleProducts] = useState(null);

  const [femaleProducts, setFemaleProducts] = useState(null);

  const [headItem, setHeadItem] = useState(0);
  const [headSelectedColor, setHeadSelectedColor] = useState(null);

  const [torsoItem, setTorsoItem] = useState("1");
  const [torsoSelectedColor, setTorsoSelectedColor] = useState(null);

  const [legsItem, setLegsItem] = useState(0);
  const [legsSelectedColor, setLegsSelectedColor] = useState(null);

  const [feetItem, setFeetItem] = useState(0);
  const [feetSelectedColor, setFeetSelectedColor] = useState(null);

  // State for selected body part for camera zooming
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <ConfiguratorContext.Provider
      value={{
        // Provide state variables and functions to consumers
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
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error("useConfigurator must be used within a ConfiguratorProvider");
  }
  return context;
};

export { ConfiguratorProvider, useConfigurator };
