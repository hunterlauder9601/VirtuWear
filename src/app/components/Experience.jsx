"use client";

import React from "react";
import {
  PresentationControls,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Suspense } from "react";
import Male from "./Male"


const Experience = () => {

  return (
    <>
      <PresentationControls
        speed={1.5}
        zoom={2}
        global
        polar={[-0.1, Math.PI / 4]}
        rotation={[Math.PI / 16, Math.PI / 8, 0]}
      >
        <group position-y={-1}>
          <Suspense fallback={null}>
            <Male />
          </Suspense>
        </group>

        <ambientLight intensity={1} />
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
      </PresentationControls>
    </>
  );
};

export default Experience;
