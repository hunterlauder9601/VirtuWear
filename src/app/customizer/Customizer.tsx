"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "../../components/Experience";
import Configurator from "../../components/Configurator";
import { ConfiguratorProvider } from "@/contexts/Customization";

const Customizer = ({data}: any) => {
  return (
    <ConfiguratorProvider>
      <div className="h-screen w-full">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 15 }}>
          <color attach="background" args={["#27224f"]} />
          <fog attach="fog" args={["#27224f", 10, 20]} />
          <Experience />
        </Canvas>
        <Configurator data={data}/>
      </div>
    </ConfiguratorProvider>
  );
};

export default Customizer;
