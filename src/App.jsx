import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Physics } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import { Loader } from "./Loader";
import { Menu } from "./Menu";
import PlayPause from "./assets/play-pause.png";
import HoverPlayPause from "./assets/hover.play-pause.png";
import InstantWin from "../public/SOUNDS/InstantWin.mp3";
import Cheer from "../public/SOUNDS/Cheer.mp3";
// import MusicBackground from "../public/SOUNDS/MusicBackground.mp3";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
  attack: "attack",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.attack, keys: ["KeyK"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  // SCORE
  const [score, setScore] = useState(0);
  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1);
  };
  // PLUS ONE STATE
  const [showPlusOne, setShowPlusOne] = useState(false);
  // GAME STATE
  const [gameState, setGameState] = useState("paused");
  const [over, setOver] = useState(false);

  const audioInstantWin = new Audio(`${InstantWin}`);
  const audioCheer = new Audio(`${Cheer}`);

  useEffect(() => {
    if (score > 0) {
      setShowPlusOne(true);
      audioInstantWin.play();
      if (score % 5 === 0) {
        audioCheer.play();
      }

      const timer = setTimeout(() => {
        setShowPlusOne(false);
      }, 500); // Show the "+1!" message for 1 second

      return () => {
        clearTimeout(timer);
      };
    }
  }, [score]);

  return (
    <>
      <div className="min-h-full h-full z-10 font-Cherry ">
        <KeyboardControls map={map}>
          <Suspense fallback={<Loader />}>
            {gameState === "paused" ? (
              <Menu setGameState={setGameState} gameState={gameState} />
            ) : (
              <>
                {/* SCORE  */}
                <h1 className="absolute m-2 top-0 left-0 z-40 text-3xl  text-transparent bg-clip-text bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
                  Score: {score}
                </h1>
              </>
            )}

            {/* PLAY / PAUSE BUTTON  */}
            <img
              className="absolute top-4 right-6 z-40 w-[30px] cursor-pointer transition-all drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] "
              onMouseOver={() => setOver(true)}
              onMouseLeave={() => setOver(false)}
              src={over ? HoverPlayPause : PlayPause}
              // onClick={() => setGameState("paused")}
              onClick={() =>
                gameState === "playing"
                  ? setGameState("paused")
                  : setGameState("playing")
              }
            />

            {/* +1  */}
            {showPlusOne && (
              <h2 className=" plusOne absolute left-[48%] z-40 text-[2rem] font-bold text-[#FFD639] tracking-wider ">
                +1
              </h2>
            )}

            <Canvas shadows camera={{ position: [0, 1.5, 8], fov: 50 }}>
              <color attach="background" args={["#00BFFF"]} />

              <Physics>
                <Experience
                  incrementScore={incrementScore}
                  setScore={setScore}
                  score={score}
                  setGameState={setGameState}
                  gameState={gameState}
                />
              </Physics>
            </Canvas>
          </Suspense>
        </KeyboardControls>
      </div>
    </>
  );
}

export default App;
