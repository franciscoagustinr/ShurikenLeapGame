/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Mushrooms.gltf
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Mushrooms(props) {
  const { nodes, materials } = useGLTF("./MODELS/Mushrooms/Mushrooms.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes["Node-Mesh"].geometry} material={materials.mat8} />
      <mesh
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat21}
      />
      <mesh
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat18}
      />
    </group>
  );
}

useGLTF.preload("./MODELS/Mushrooms/Mushrooms.gltf");
