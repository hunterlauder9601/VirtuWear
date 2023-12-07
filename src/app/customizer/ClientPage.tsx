"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Configurator from "./Configurator";
import { ConfiguratorProvider } from "@/contexts/Customization";

const Customizer = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <ConfiguratorProvider>
      <div className="h-screen w-full">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 15 }}>
          <color attach="background" args={["#27224f"]} />
          <fog attach="fog" args={["#27224f", 10, 20]} />
          <Experience setIsTransitioning={setIsTransitioning} />
        </Canvas>
        <div
          className={`absolute left-0 top-0 h-full w-full ${
            isTransitioning ? "pointer-events-auto" : "pointer-events-none"
          }`}
        ></div>
        <Configurator />
      </div>
    </ConfiguratorProvider>
  );
};

export default Customizer;
