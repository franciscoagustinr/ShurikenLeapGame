/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Pine.gltf
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Pine(props) {
  const { nodes, materials } = useGLTF("./MODELS/Pine/Pine.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.pine_tree.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload("./MODELS/Pine/Pine.gltf");
