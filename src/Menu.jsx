import React, { useEffect, useState } from "react";

export const Menu = ({ gameState, setGameState }) => {
  return (
    <>
      <div className=" menu fixed left-0 top-0 gap-8 h-full w-full flex flex-col flex- items-center justify-evenly z-30 ">
        <h1 className="relative top-[5%] text-[10em] text-center text-[#FFD639] select-none tracking-tight leading-none ">
          Shuriken Leap
        </h1>
        <button
          className="p-6 w-auto h-auto rounded-full border-2 border-[#FFFF] hover:border-[#FFD639] text-4xl text-[white] hover:text-[#FFD639] hover:scale-[1.2] transition-all tracking-wider "
          disabled={gameState != "paused"}
          onClick={() => {
            setGameState("playing");
          }}
        >
          Start Game!
        </button>
        <p className="text-lg">
          Developed by{" "}
          <a
            target="_blank"
            href="https://franciscoagustinr.github.io/"
            className="hover:text-[#FFD639] transition-all duration-300"
          >
            Francisco Agustín Rodríguez
          </a>
        </p>
      </div>
    </>
  );
};
