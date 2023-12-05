"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Configurator from "./Configurator";
import { ConfiguratorProvider } from "@/contexts/Customization";

const Customizer = () => {
  const [isTransitioning, setIsTransitioning] = useState(false); // State to track transition

  return (
    <ConfiguratorProvider>
      <div className="h-screen w-full">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 15 }}>
          <color attach="background" args={["#27224f"]} />
          <fog attach="fog" args={["#27224f", 10, 20]} />
          <Experience setIsTransitioning={setIsTransitioning} />
        </Canvas>
        <div className={`absolute top-0 left-0 w-full h-full ${isTransitioning ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        </div>
        <Configurator />
      </div>
    </ConfiguratorProvider>
  );
};

export default Customizer;
