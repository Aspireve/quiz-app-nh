"use client";

import QuestionDisplay from "@/components/QuestionDisplay";
import { useUser } from "@/context/UserContext";
import { fetchUserQuestions } from "@/functions/fetchUserQuestions";
import { setScoreWithUId } from "@/functions/setScore";
import { toast } from "@/hooks/use-toast";
import { Question } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalLength, settotalLength] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerArray, setAnswerArray] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    if (user) {
      fetchUserQuestions(user.uid).then((data) => {
        setQuestions(data);
        setCurrentStep(1);
        settotalLength(data.length);
      });
    }
  }, [user]);

  useEffect(() => {
    const answered = JSON.parse(localStorage.getItem("answers") || "{}");
    if (answered) {
      setAnswerArray((prev) => {
        const updatedArray = [...prev];
        Object.keys(answered).forEach((key) => {
          if (answered[key] !== null) {
            updatedArray[parseInt(key) - 1] = answered[key];
          }
        });
        return updatedArray;
      });
    }
  }, [currentStep]);

  const setUserScore = async () => {
    const answered = JSON.parse(localStorage.getItem("answers") || "{}");
    const updatedArray = [...answerArray];
    if (answered) {
      Object.keys(answered).forEach((key) => {
        if (answered[key] !== null) {
          updatedArray[parseInt(key) - 1] = answered[key];
        }
      });
    }
    if (user) {
      await setScoreWithUId(user.uid, updatedArray);
      router.push(`/points`);
    }
  };

  return (
    <div className="w-[80%] md:w-full max-w-[30rem]  m-auto h-full min-h-[100dvh]">
      <nav className="w-full text-white my-5 text-center">Live Quiz</nav>
      <div className="m-auto">
        <Image
          className="rounded-xl shadow-lg"
          src="/Hyperloop-India.png"
          alt="Next.js logo"
          width={1000}
          height={100}
          priority
        />

        <h1 className="text-white mt-5 text-lg">Hyperloop Quiz</h1>
        <div className="flex overflow-x-scroll mt-3 gap-3 pb-5">
          {Array.from({ length: totalLength }).map((_, index) => (
            <div
              key={index}
              className={`cursor-pointer w-10 transition-all duration-300 h-10 text-center rounded-full bg-[#393f6e] ${
                currentStep === index + 1
                  ? "bg-gradient-to-bl from-[#c23fbc] to-[#b71e84]"
                  : answerArray[index] && "bg-[#1e2139]"
              } shadow-xl flex items-center justify-center text-white shrink-0`}
              onClick={() => {
                if (index > answerArray.findIndex(item => item === "")) {
                  return toast({
                    title: "You are trying to view an locked question",
                    description:
                      "Answer all the previous questions to unlock this question",
                    color: "success",
                  });
                }
                setCurrentStep(index + 1);
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        {questions.length > 0 && (
          <QuestionDisplay
            key={`que-${currentStep}`}
            currentStep={currentStep}
            isLast={currentStep === totalLength}
            setCurrentStep={setCurrentStep}
            q={questions[currentStep - 1]}
            setUserScore={setUserScore}
          />
        )}
      </div>
    </div>
  );
}
