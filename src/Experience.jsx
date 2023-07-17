import React, { useEffect, useState } from "react";
import {
  ContactShadows,
  Cylinder,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
} from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Pagoda } from "./Pagoda";
import { CharacterController } from "./CharacterController";
import { JapaneseLamp } from "../public/MODELS/Lamp/JapaneseLamp";
import { Bonsai } from "../public/MODELS/Bonsai/Bonsai";
import { Traps } from "./Traps";
import { useFrame } from "@react-three/fiber";
import { Torii } from "../public/MODELS/Torii/Torii";
import { Cloud } from "../public/MODELS/Cloud/Cloud";
import { Mushrooms } from "../public/MODELS/Mushrooms/Mushrooms";
import { Tree } from "../public/MODELS/Tree/Tree";
import { Pine } from "../public/MODELS/Pine/Pine";

export const Experience = ({
  incrementScore,
  setScore,
  score,
  gameState,
  setGameState,
}) => {
  // LAMP LOGIC
  const lampCount = 8;
  const radius = 5;
  const lampPositions = [];
  for (let i = 0; i < lampCount; i++) {
    const angle = (Math.PI * 2 * i) / lampCount;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    lampPositions.push({ x, y: 0.25, z });
  }

  const [CharacterState, setCharacterState] = useState("");
  const [trapPos, setTrapPos] = useState();
  const [ninjaPos, setNinjaPos] = useState();
  const [isOnAir, setIsOnAir] = useState(false);
  const [ninjaEnter, setNinjaEnter] = useState(false);
  const [speed, setSpeed] = useState(1.5);

  useEffect(() => {
    if (ninjaEnter === true && ninjaPos.y > trapPos.y) {
      incrementScore();
      setSpeed((prevSpeed) => prevSpeed + 0.2);
    }
  }, [ninjaEnter]);

  return (
    <>
      <ContactShadows opacity={0.25} scale={10} blur={1.5} far={0.8} />
      {/* <Environment preset="city" /> */}
      <Environment files={"./MODELS/city.hdr"} path={"/"} />

      {/* STAGE */}
      <group>
        <RigidBody
          colliders={"trimesh"}
          type="fixed"
          position-y={-0.5}
          friction={3}
        >
          <Cylinder scale={[6, 1, 6]}>
            <meshStandardMaterial color={"green"} receiveShadow />
          </Cylinder>
        </RigidBody>
      </group>

      {/* SENSOR STAGE */}
      <RigidBody colliders={false} type="fixed" name="sensor">
        <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200]} />
          {/* <meshStandardMaterial color={"#00BFFF"} /> */}
          <MeshReflectorMaterial
            blur={[200, 200]}
            mixBlur={0.6}
            mixStrength={0.5}
            color={"#00BFFF"}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>

      {/* LAMPS */}
      {lampPositions.map((position, index) => (
        <RigidBody
          key={index}
          type="dynamic"
          position={[position.x, position.y, position.z]}
        >
          <mesh scale={0.15} castShadow>
            <JapaneseLamp />
          </mesh>
        </RigidBody>
      ))}

      {/* NINJA */}
      {gameState != "paused" && (
        <group>
          <RigidBody type="fixed" colliders={false} name="ninja">
            <mesh scale={0.15} castShadow>
              <CharacterController
                setNinjaPos={setNinjaPos}
                ninjaPos={ninjaPos}
                CharacterState={CharacterState}
                setCharacterState={setCharacterState}
                isOnAir={isOnAir}
                setIsOnAir={setIsOnAir}
                setScore={setScore}
                setSpeed={setSpeed}
                setGameState={setGameState}
                gameState={gameState}
              />
            </mesh>
          </RigidBody>
        </group>
      )}

      {/* PAGODA */}
      <RigidBody type="dynamic">
        <mesh scale={0.1} position={[0, 0, -3]} castShadow>
          <Pagoda />
        </mesh>
      </RigidBody>

      {/* BONSAI  */}
      <RigidBody colliders={"cuboid"} type="fixed">
        <mesh scale={1.2} position={[3, 1.2, -1.5]} castShadow>
          <Bonsai />
        </mesh>
      </RigidBody>

      {/* TRAP */}
      <group>
        <Traps
          setTrapPos={setTrapPos}
          trapPos={trapPos}
          setNinjaEnter={setNinjaEnter}
          incrementScore={incrementScore}
          setScore={setScore}
          score={score}
          setSpeed={setSpeed}
          speed={speed}
          setGameState={setGameState}
          gameState={gameState}
        />
      </group>

      {/* TORII */}
      <group position-x={-2} position-z={-5.5} castShadow>
        <mesh scale={5} position={[-2.8, 1.2, -2]} rotation-y={-Math.PI / 1.4}>
          <Torii />
        </mesh>
        <mesh scale={4} position={[-5, 1.2, -2.2]} rotation-y={-Math.PI / 1.5}>
          <Torii />
        </mesh>
        <mesh scale={4} position={[-1, 1.2, -2.4]} rotation-y={-Math.PI / 1.4}>
          <Torii />
        </mesh>
      </group>

      {/* CLOUDS */}
      <group castShadow>
        <mesh scale={0.02} position={[7, 1.5, -10]} rotation-y={Math.PI / 1.1}>
          <Cloud />
        </mesh>
        <mesh
          scale={0.02}
          position={[-7, 2.2, -10]}
          rotation-y={Math.PI / -1.1}
        >
          <Cloud />
        </mesh>
      </group>

      {/* MUSHROOMS */}
      <RigidBody type="dynamic">
        <mesh
          scale={0.5}
          position={[-2, 0.2, 5]}
          rotation-y={Math.PI / 2}
          castShadow
        >
          <Mushrooms />
        </mesh>
      </RigidBody>

      {/* TREES */}
      <group castShadow>
        <mesh scale={0.15} position={[-5, -0.1, 4.5]}>
          <Tree />
        </mesh>
        <mesh scale={0.1} position={[-4.5, -0.1, 4.8]}>
          <Tree />
        </mesh>
        <mesh scale={0.09} position={[-6, -0.1, -4]}>
          <Tree />
        </mesh>
      </group>

      {/* PINES */}
      <group castShadow>
        <mesh scale={1.2} position={[7, 1, -3]}>
          <Pine />
        </mesh>
        <mesh scale={0.8} position={[6.2, 0.5, -2]}>
          <Pine />
        </mesh>
        <mesh scale={0.9} position={[7.2, 0.5, -1]}>
          <Pine />
        </mesh>
        <mesh scale={1.2} position={[-4, 1, -3]}>
          <Pine />
        </mesh>
      </group>
    </>
  );
};
