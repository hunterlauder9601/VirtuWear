import { useConfigurator } from "../../contexts/Customization";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useLayoutEffect } from "react";
import * as Three from "three";

export default function Model(props) {
  const group = useRef();
  const headwear = useRef();
  const torso = useRef();
  const glasses = useRef();
  const bottom = useRef();
  const footwear = useRef();

  const { nodes, materials } = useGLTF("compose_model.glb");
  const { animations: standingAnimation } = useFBX("standing.fbx");

  standingAnimation[0].name = "Standing";

  const { actions } = useAnimations(standingAnimation, group);

  useEffect(() => {
    actions["Standing"].reset().play();
  }, [actions]);

  const {
    sexSelection,
    headItem,
    headSelectedColor,
    glassesItem,
    glassesSelectedColor,
    torsoItem,
    torsoSelectedColor,
    legsItem,
    legsSelectedColor,
    feetItem,
    feetSelectedColor,
  } = useConfigurator();


  useEffect(() => {
    if (headItem === "1") {
      materials.Wolf3D_Headwear.color.set = new Three.Color(headSelectedColor);
    }
  }, [headItem, headSelectedColor, materials]);
  
  useEffect(() => {
    if (glassesItem === "1") {
      materials.Wolf3D_Glasses.color = new Three.Color(glassesSelectedColor);
    }
  }, [glassesItem, glassesSelectedColor, materials]);

  useEffect(() => {
    if(torsoItem === "1") {
      materials.Wolf3D_Outfit_Top_2.color = new Three.Color(torsoSelectedColor);
    } else if(torsoItem === "2") {
      materials.Wolf3D_Outfit_Top.color = new Three.Color(torsoSelectedColor);
    }
  }, [torsoSelectedColor, torsoItem, materials]);

  useEffect(() => {
    if (legsItem === "1") {
      materials.Wolf3D_Outfit_Bottom.color = new Three.Color(legsSelectedColor);
    } else if (legsItem === "2") {
      materials.Wolf3D_Outfit_Bottom_2.color = new Three.Color(legsSelectedColor);
    }
  }, [legsItem, legsSelectedColor, materials]);
  
  useEffect(() => {
    if (feetItem === "1") {
      materials.Wolf3D_Outfit_Footwear.color = new Three.Color(feetSelectedColor);
    } else if (feetItem === "2") {
      materials.Wolf3D_Outfit_Footwear_2.color = new Three.Color(feetSelectedColor);
    }
  }, [feetItem, feetSelectedColor, materials]);

  // Disable frustum culling to avoid weird visual side effects
  useLayoutEffect(() => {
    if (group.current) {
      group.current.traverse((obj) => {
        obj.frustumCulled = false;
      });
    }
  }, []);

  return (
    <group {...props} dispose={null} ref={group}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
          />
          {glassesItem === "1" && (
            <skinnedMesh
              name="Wolf3D_Glasses"
              geometry={nodes.Wolf3D_Glasses.geometry}
              material={materials.Wolf3D_Glasses}
              skeleton={nodes.Wolf3D_Glasses.skeleton}
              ref={glasses}
            />
          )}
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          {headItem === "1" && (
            <skinnedMesh
              name="Wolf3D_Headwear"
              geometry={nodes.Wolf3D_Headwear.geometry}
              material={materials.Wolf3D_Headwear}
              skeleton={nodes.Wolf3D_Headwear.skeleton}
              ref={headwear}
            />
          )}
          {legsItem === "1" && (
            <skinnedMesh
              name="Wolf3D_Outfit_Bottom"
              geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
              material={materials.Wolf3D_Outfit_Bottom}
              skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
              ref={bottom}
              morphTargetDictionary={
                nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences
              }
            />
          )}
          {legsItem === "2" && (
            <skinnedMesh
              name="Wolf3D_Outfit_Bottom_2"
              geometry={nodes.Wolf3D_Outfit_Bottom_2.geometry}
              material={materials.Wolf3D_Outfit_Bottom_2}
              skeleton={nodes.Wolf3D_Outfit_Bottom_2.skeleton}
              ref={bottom}
              morphTargetDictionary={
                nodes.Wolf3D_Outfit_Bottom_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.Wolf3D_Outfit_Bottom_2.morphTargetInfluences
              }
            />
          )}
          {feetItem === "1" && (
            <skinnedMesh
              name="Wolf3D_Outfit_Footwear"
              geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
              material={materials.Wolf3D_Outfit_Footwear}
              skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
              ref={footwear}
              morphTargetDictionary={
                nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
              }
            />
          )}
          {feetItem === "2" && (
            <skinnedMesh
              name="Wolf3D_Outfit_Footwear_2"
              geometry={nodes.Wolf3D_Outfit_Footwear_2.geometry}
              material={materials.Wolf3D_Outfit_Footwear_2}
              skeleton={nodes.Wolf3D_Outfit_Footwear_2.skeleton}
              ref={footwear}
              morphTargetDictionary={
                nodes.Wolf3D_Outfit_Footwear_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.Wolf3D_Outfit_Footwear_2.morphTargetInfluences
              }
            />
          )}
          {torsoItem === "2" && (
            <skinnedMesh
              name="Wolf3D_Outfit_Top"
              geometry={nodes.Wolf3D_Outfit_Top.geometry}
              material={materials.Wolf3D_Outfit_Top}
              skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
              ref={torso}
              morphTargetDictionary={
                nodes.Wolf3D_Outfit_Top.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.Wolf3D_Outfit_Top.morphTargetInfluences
              }
            />
          )}
          {torsoItem === "1" && (
            <skinnedMesh
              name="Wolf3D_Outfit_Top_2"
              geometry={nodes.Wolf3D_Outfit_Top_2.geometry}
              material={materials.Wolf3D_Outfit_Top_2}
              skeleton={nodes.Wolf3D_Outfit_Top_2.skeleton}
              ref={torso}
              morphTargetDictionary={
                nodes.Wolf3D_Outfit_Top_2.morphTargetDictionary
              }
              morphTargetInfluences={
                nodes.Wolf3D_Outfit_Top_2.morphTargetInfluences
              }
            />
          )}
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/male.glb");
