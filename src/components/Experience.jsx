"use client";

import { PresentationControls, MeshReflectorMaterial } from "@react-three/drei";
import { useConfigurator } from "@/contexts/Customization";
import { Suspense } from "react";
import CameraHandler from "./CameraHandler";
import Male from "./Male";

const getCameraPosition = (part) => {
  switch (part) {
    case "HEAD":
      return [0, 3, 7];  // position for HEAD
    case "TORSO":
      return [0, 1, 8];  // position for TORSO
    //... handle other parts similarly
    default:
      return [0, 0, 9];  // Default position
  }
};


const Content = () => (
  <>
    <group position-y={-1}>
      <Suspense fallback={null}>
        <Male />
      </Suspense>
    </group>

    {/* Ambient light for general fill */}
    <ambientLight intensity={0.5} />

    {/* Key Light with softer shadow */}
    <directionalLight
      intensity={1.0}
      position={[2, 2, 1]}
      castShadow
      shadow-radius={1}
    />

    {/* Fill Light for reducing shadows */}
    <pointLight intensity={0.6} position={[-2, 2, -2]} />

    {/* Back/Rim Light for 3D feel */}
    <spotLight intensity={0.6} position={[-2, 4, 3]} angle={Math.PI / 6} />

    <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-1}>
      <planeGeometry args={[170, 170]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#141424"
        metalness={0.5}
      />
    </mesh>
  </>
);
const Experience = () => {
  const { selectedPart } = useConfigurator();

  if (selectedPart === null) {
    return (
      <PresentationControls
        speed={1.5}
        zoom={1.5}
        global
        polar={[-0.1, Math.PI / 4]}
        rotation={[Math.PI / 16, Math.PI / 8, 0]}
      >
        <Content />
      </PresentationControls>
    );
  } else {
    return (
      <>
        <CameraHandler selectedPart={selectedPart} />
        <Content />
      </>
    );
  }
};

export default Experience;
