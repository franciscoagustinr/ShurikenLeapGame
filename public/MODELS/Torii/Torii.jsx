/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Torii.gltf
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Torii(props) {
  const { nodes, materials } = useGLTF("./MODELS/Torii/Torii.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat23} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat14}
      />
    </group>
  );
}

useGLTF.preload("./MODELS/Torii/Torii.gltf");
