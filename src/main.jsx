import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useFrame } from "@react-three/fiber";

const screenWidth = window.innerWidth;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {screenWidth < 768 ? (
      <>
        <div className=" absolute min-h-[100vh] min-w-[80vw] flex flex-col justify-center items-center align-center z-50 text-[5rem] bg-[green] text-center font-Cherry  ">
          <h1 className="text-[7rem] text-[#FFD639] leading-none ">
            Shuriken Leap
          </h1>
          <h1 className="px-6 text-[2rem] text-[black] mt-4">
            Move to a bigger device to play
          </h1>
        </div>
      </>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
