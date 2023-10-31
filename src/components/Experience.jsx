"use client";

import { MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import { useConfigurator } from "@/contexts/Customization";
import { Suspense, useRef, useEffect } from "react";
import Male from "./Male";
import TWEEN from "@tweenjs/tween.js";
import { useFrame, useThree } from "@react-three/fiber";

function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
}

const Experience = () => {
  const { camera } = useThree();
  const { selectedPart } = useConfigurator();
  const controlsRef = useRef();

  useEffect(() => {
    if (!controlsRef.current || !selectedPart) {
      return;
    }
    let position, lookAt;

    switch (selectedPart) {
      case "HEAD":
        position = { x: 0, y: 0.65, z: 2.5 };
        lookAt = { x: 0, y: 0.65, z: 0 };
        break;
      case "TORSO":
        position = { x: 0, y: 0.3, z: 3 };
        lookAt = { x: 0, y: 0.3, z: 0 };
        break;
      case "LEGS":
        position = { x: 0, y: -0.3, z: 4 };
        lookAt = { x: 0, y: -0.4, z: 0 };
        break;
      case "FEET":
        position = { x: 0, y: -0.4, z: 4 };
        lookAt = { x: 0, y: -0.7, z: 0 };
        break;
      case "MENU":
        position = { x: 0, y: 0, z: 9 };
        lookAt = { x: 0, y: 0, z: 0 };
    }

    // Animate controls target
    new TWEEN.Tween(controlsRef.current.target)
      .to(lookAt, 4000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    // Animate camera position
    new TWEEN.Tween(camera.position)
      .to(position, 4000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }, [selectedPart, controlsRef, camera.position]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2}
      />
      <Tween />
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

  // if (selectedPart === null) {
  //   return (
  // <PresentationControls
  //   speed={1.5}
  //   zoom={1.5}
  //   global
  //   polar={[-0.1, Math.PI / 4]}
  //   rotation={[Math.PI / 16, Math.PI / 8, 0]}
  // >
  //       <Content />
  //     </PresentationControls>
  //   );
  // } else {
  //   return (
  //     <>
  //       <CameraHandler selectedPart={selectedPart} />
  //       <Content />
  //     </>
  //   );
  // }
};

export default Experience;
