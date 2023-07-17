import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  quat,
} from "@react-three/rapier";
import React, { useRef } from "react";
import * as THREE from "three";

export const Traps = ({
  setTrapPos,
  setScore,
  score,
  setNinjaEnter,
  setSpeed,
  speed,
  gameState,
  setGameState,
}) => {
  const obstacle = useRef();
  const trap = useRef();

  const MAX_VEL = 7;

  useFrame((_state, delta) => {
    if (gameState !== "paused") {
      const curRotation = quat(obstacle.current.rotation());
      const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        // delta * 7
        delta * speed < MAX_VEL ? delta * speed : MAX_VEL
      );

      curRotation.multiply(incrementRotation);
      obstacle.current.setNextKinematicRotation(curRotation);

      const trapWorldPosition = trap.current.getWorldPosition(
        new THREE.Vector3()
      );
      setTrapPos(trapWorldPosition);
    }
  });

  return (
    <>
      <RigidBody
        name="obstacle"
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.1, 2]}
        colliders={false}
        // colliders={"trimesh"}
        restitution={1}
        onIntersectionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "character") {
            setNinjaEnter(true);
          }
        }}
        onIntersectionExit={() => {
          setNinjaEnter(false);
        }}
      >
        <group ref={trap}>
          <mesh scale={1}>
            {/* SENSOR 4 JUMP  */}
            <CylinderCollider args={[0.2, 2.5, 0.1]} trigger={false} sensor />
            {/* TRAMP COLLIDER  */}
            <CuboidCollider args={[2.5, 0.1, 0.1]} trigger={false} />
            <boxBufferGeometry args={[5, 0.2, 0.2]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </group>
      </RigidBody>
    </>
  );
};
