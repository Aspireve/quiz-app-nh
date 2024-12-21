"use client";

import Confetti from "@/components/Confetti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const page = () => {
  return (
    <div className="w-[80%] md:w-full max-w-[30rem]  m-auto h-[100dvh] flex items-center justify-center">
      <Confetti />
      <div className="z-10 px-6 py-6 rounded-xl text-white flex items-center justify-center flex-col gap-4 w-full backdrop-blur-md">
        <Avatar className="h-28 w-28 border-4 border-white">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="m-auto text-center flex flex-col gap-2">
          <h2 className="font-normal text-sm">You won</h2>
          <p className="text-6xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
            3000
          </p>
          <p>POINTS</p>
        </div>
        <div className="w-full flex flex-col gap-5">
          <button className="bg-gradient-to-br from-[#e25a9d] to-[#894ba8] text-white w-full py-2 shadow-xl rounded-xl ">
            Play Again
          </button>
          <button className="bg-gradient-to-tr from-[#2e65a6] to-[#3e9fff] text-white w-full py-2 shadow-xl rounded-xl ">
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
