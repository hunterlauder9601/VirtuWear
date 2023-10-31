import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as TWEEN from '@tweenjs/tween.js'

const annotations = {
  HEAD: {
    position: { x: 0, y: 3, z: 7 },
    lookAt: { x: 0, y: 3, z: 0 },
  },
  TORSO: {
    position: { x: 0, y: 1, z: 8 },
    lookAt: { x: 0, y: 1, z: 0 },
  },
  //... add other parts similarly
};

const CameraHandler = ({ selectedPart }) => {
  const cameraControls = useRef();
  const { camera } = useThree();

  useFrame(() => {
    TWEEN.update();
  });

  useEffect(() => {
    if (cameraControls.current && selectedPart && annotations[selectedPart]) {
      const { position, lookAt } = annotations[selectedPart];
      console.log(
        "position:" +
          JSON.stringify(position) +
          "\nlookAt:" +
          JSON.stringify(lookAt),
      );

      
      // Change camera's target (lookAt) smoothly
      if (
        lookAt.x != undefined &&
        lookAt.y != undefined &&
        lookAt.z != undefined
      ) {
        new TWEEN.Tween(cameraControls.current.target)
          .to({ x: 0, y: 3, z: 0 }, 2100)
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
      }

      // Change camera position smoothly
      if (
        position.x != undefined &&
        position.y != undefined &&
        position.z != undefined
      ) {
        new TWEEN.Tween(camera.position)
          .to({ x: position.x, y: position.y, z: position.z }, 2000)
          .easing(TWEEN.Easing.Cubic.Out)
          .start();
      }

    }
  }, [selectedPart, camera]);

  return <CameraControls ref={cameraControls} />;
};

export default CameraHandler;
