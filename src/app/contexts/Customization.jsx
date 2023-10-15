import { useState, useContext, createContext } from "react";

// Create a context to manage the states for items and colors
const ConfiguratorContext = createContext();

const ConfiguratorProvider = ({ children }) => {
  // Separate state variables for each section
  const [headItem, setHeadItem] = useState(null);
  const [headSelectedColor, setHeadSelectedColor] = useState(null);

  const [torsoItem, setTorsoItem] = useState(null);
  const [torsoSelectedColor, setTorsoSelectedColor] = useState(null);

  const [legsItem, setLegsItem] = useState(null);
  const [legsSelectedColor, setLegsSelectedColor] = useState(null);

  const [feetItem, setFeetItem] = useState(null);
  const [feetSelectedColor, setFeetSelectedColor] = useState(null);

  return (
    <ConfiguratorContext.Provider
      value={{
        // Provide state variables and functions to consumers
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
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

// Create a custom hook to easily access the context within components
const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error("useConfigurator must be used within a ConfiguratorProvider");
  }
  return context;
};

export { ConfiguratorProvider, useConfigurator };
