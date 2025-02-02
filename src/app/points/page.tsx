"use client";

import Confetti from "@/components/Confetti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";
import { fetchScoreByUid } from "@/functions/fetchScoreByUid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    setLoading(true);
    if (user) {
      fetchScoreByUid(user?.uid)
        .then((data) => {
          if (data) {
            setScore(data);
          } else {
            router.replace("/");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);
  return (
    <div className="w-[80%] md:w-full max-w-[30rem]  m-auto h-[100dvh] flex items-center justify-center">
      <Confetti />
      <div className="z-10 px-6 py-6 rounded-xl text-white flex items-center justify-center flex-col gap-4 w-full backdrop-blur-md">
        <Avatar className="h-28 w-28 border-4 border-white">
          <AvatarImage
            src={`${
              user?.photoURL || "https://github.com/Aspireve.png"
            }?dma_cps=sypham`}
          />
          <AvatarFallback>{user?.displayName || "MO"}</AvatarFallback>
        </Avatar>
        <div className="m-auto text-center flex flex-col gap-2">
          <h2 className="font-normal text-sm">You won</h2>
          {loading ? (
            <Skeleton className="h-[60px] w-[100px] rounded-md shrink-0 shadow-lg" />
          ) : (
            <p
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent"
              style={{
                background: "linear-gradient(to right, #FFD700, #B8860B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "inherit", // Fallback for unsupported environments
              }}
            >
              {score}
            </p>
          )}

          <p>POINTS</p>
        </div>
        <div className="w-full flex flex-col gap-5">
          <button
            className="bg-gradient-to-br from-[#e25a9d] to-[#894ba8] text-white w-full py-2 shadow-xl rounded-xl "
            onClick={() => router.push("./leaderboard")}
          >
            Leaderboard
          </button>
          <button
            disabled={!score}
            onClick={() => { // Replace this with the actual user score dynamically
              const tweetText = encodeURIComponent(
                `I just scored ${score} on the Nirmaan Hyperloop Quiz! Find out how much YOU know about Hyperloop technology. Take the quiz now! #HyperloopQuiz #NirmaanHyperloop`
              );
              const tweetUrl = encodeURIComponent(
                "https://www.quiz.nirmaanhyperloop.com"
              );
              const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
              window.open(twitterShareUrl, "_blank");
            }}
            className="bg-gradient-to-tr from-[#2e65a6] to-[#3e9fff] text-white w-full py-2 shadow-xl rounded-xl "
          >
            Share on Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
