import { MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import { useConfigurator } from "@/contexts/Customization";
import { Suspense, useRef, useEffect } from "react";
import Male from "./Male";
import Female from "./Female";
import TWEEN from "@tweenjs/tween.js";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide } from "three";

const Experience = ({ setIsTransitioning }) => {
  const { camera } = useThree();
  const { selectedPart, sexSelection } = useConfigurator();
  const controlsRef = useRef();

  function Tween() {
    useFrame(() => {
      TWEEN.update();
    });
  }

  useEffect(() => {
    if (!controlsRef.current || !selectedPart) {
      return;
    }
    let position, lookAt;

    setIsTransitioning(true);

    switch (selectedPart) {
      case "HEAD":
      case "GLASSES":
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
      default:
        position = { x: 0, y: 0, z: 9 };
        lookAt = { x: 0, y: 0, z: 0 };
    }

    // Animate controls target
    new TWEEN.Tween(controlsRef.current.target)
      .to(lookAt, 3100)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    // Animate camera position
    new TWEEN.Tween(camera.position)
      .to(position, 3000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => setIsTransitioning(false))
      .start();
  }, [selectedPart, controlsRef, camera.position]);

  useEffect(() => {
    // Adjusting camera's near and far clipping planes
    camera.near = 0.01;
    camera.far = 1000;
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <group>
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2}
        minDistance={1} // Set minimum distance to avoid clipping
        maxDistance={15} // Set maximum distance as per your need
      />
      <Tween />
      <group position-y={-1}>
        <Suspense fallback={null}>
          {sexSelection === "women" ? (
            <Female />
          ) : sexSelection === "men" ? (
            <Male />
          ) : null}
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
          side={DoubleSide}
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
    </group>
  );
};

export default Experience;
