import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { Ninja } from "./Ninja";
import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "./App";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Lose from "../public/SOUNDS/Lose2.mp3";

export const CharacterController = ({
  setNinjaPos,
  CharacterState,
  setCharacterState,
  setIsOnAir,
  setScore,
  setSpeed,
}) => {
  const JUMP_FORCE = 0.08;
  const MOVEMENT_SPEED = 0.03;
  const MAX_VEL = 1;
  const RUN_VEL = 1.5;

  const rigidBody = useRef();
  const character = useRef();
  const isOnFloor = useRef(true);
  // const [CharacterState, setCharacterState] = useState("");

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const attackPressed = useKeyboardControls((state) => state[Controls.attack]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const audioLose = new Audio(`${Lose}`);

  const resetPosition = () => {
    rigidBody.current.setTranslation(vec3({ x: 0, y: 5, z: -2 }));
    setScore(0);
    setSpeed(1.5);
  };

  useFrame((state) => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linvel = rigidBody.current.linvel();
    let changeRotation = false;
    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE;
      isOnFloor.current = false;
      setIsOnAir(true);
      setCharacterState("JUMP");
    }
    if (rightPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
      setCharacterState("RUN");
    }

    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
      setCharacterState("RUN");
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
      setCharacterState("RUN");
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
      setCharacterState("RUN");
    }
    if (attackPressed) {
      changeRotation = false;
      setCharacterState("ATTACK");
    }
    if (
      !jumpPressed &&
      !rightPressed &&
      !leftPressed &&
      !backPressed &&
      !forwardPressed &&
      !attackPressed
    ) {
      setCharacterState("Idle");
    }

    rigidBody.current.applyImpulse(impulse, true);

    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      character.current.rotation.y = angle;
    }

    // FOLLOW CHARACTER
    const characterWorldPosition = character.current.getWorldPosition(
      new THREE.Vector3()
    );
    setNinjaPos(characterWorldPosition);
    // console.log(characterWorldPosition);
    state.camera.position.x = characterWorldPosition.x;
    state.camera.position.y = characterWorldPosition.y + 3;
    state.camera.position.z = characterWorldPosition.z + 7;

    const targetLook = new THREE.Vector3(
      characterWorldPosition.x,
      characterWorldPosition.y,
      characterWorldPosition.z
    );
    state.camera.lookAt(targetLook);
  });

  return (
    <>
      <group>
        <RigidBody
          ref={rigidBody}
          colliders={false}
          // position-y={5}
          position={[0, 5, -5]}
          name="character"
          enabledRotations={[false, false, false]}
          onCollisionEnter={() => {
            isOnFloor.current = true;
          }}
          onIntersectionEnter={({ other }) => {
            if (other.rigidBodyObject.name === "sensor") {
              audioLose.play();
              resetPosition();
            }
          }}
        >
          <CapsuleCollider args={[0.8, 0.9]} position={[0, 1.64, 0]} />
          <group ref={character} castShadow scale={1.4}>
            <Ninja CharacterState={CharacterState} />
          </group>
        </RigidBody>
      </group>
    </>
  );
};
