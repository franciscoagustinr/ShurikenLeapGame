import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, ContactShadows } from "@react-three/drei";

export function Ninja(props, { CharacterState }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./MODELS/Ninja/Ninja.gltf");
  const { actions } = useAnimations(animations, group);
  // console.log(actions);
  useEffect(() => {
    if (props.CharacterState === "RUN") {
      // actions["CharacterArmature|Run"].play().fadeIn(0.5);
      actions["CharacterArmature|Run"].fadeIn(0.1).play();
    }
    if (props.CharacterState === "ATTACK") {
      actions["CharacterArmature|Run"].stop();

      actions["CharacterArmature|Weapon"].play();
    }
    if (props.CharacterState === "JUMP") {
      actions["CharacterArmature|Run"].stop();
      actions["CharacterArmature|Jump_Idle"].play();

      actions["CharacterArmature|Jump_Idle"].setDuration = 2;
    }
    if (props.CharacterState === "Idle") {
      actions["CharacterArmature|Run"].stop().fadeOut(2);
      setTimeout(() => {
        actions["CharacterArmature|Jump_Idle"].stop().fadeOut(5);
        actions["CharacterArmature|Weapon"].stop().fadeOut(5);
      }, 550);
    }
  }, [props.CharacterState, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group name="Ninja" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Ninja_1"
              geometry={nodes.Ninja_1.geometry}
              material={materials.Ninja_Main}
              skeleton={nodes.Ninja_1.skeleton}
            />
            <skinnedMesh
              name="Ninja_2"
              geometry={nodes.Ninja_2.geometry}
              material={materials.Ninja_Secondary}
              skeleton={nodes.Ninja_2.skeleton}
            />
            <skinnedMesh
              name="Ninja_3"
              geometry={nodes.Ninja_3.geometry}
              material={materials.Belt}
              skeleton={nodes.Ninja_3.skeleton}
            />
            <skinnedMesh
              name="Ninja_4"
              geometry={nodes.Ninja_4.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Ninja_4.skeleton}
            />
            <skinnedMesh
              name="Ninja_5"
              geometry={nodes.Ninja_5.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Ninja_5.skeleton}
            />
            <skinnedMesh
              name="Ninja_6"
              geometry={nodes.Ninja_6.geometry}
              material={materials.Gold}
              skeleton={nodes.Ninja_6.skeleton}
            />
            <skinnedMesh
              name="Ninja_7"
              geometry={nodes.Ninja_7.geometry}
              material={materials.Birb_Secondary}
              skeleton={nodes.Ninja_7.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./MODELS/Ninja/Ninja.gltf");
