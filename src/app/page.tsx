"use client";

import QuestionDisplay from "@/components/QuestionDisplay";
import { useUser } from "@/context/UserContext";
import { fetchUserQuestions } from "@/functions/fetchUserQuestions";
import { Question } from "@/types/questions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [totalLength, settotalLength] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (user) {
      fetchUserQuestions(user?.uid).then((data) => {
        const qs = data.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options,
        }));
        setQuestions(qs);
        setCurrentStep(1);
        settotalLength(qs.length);
      });
    }
  }, [user]);

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
              className={`w-10 transition-all duration-300 h-10 text-center rounded-full bg-[#393f6e] ${
                currentStep === index + 1
                  ? "bg-gradient-to-bl from-[#c23fbc] to-[#b71e84]"
                  : ""
              } shadow-xl flex items-center justify-center text-white shrink-0`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        {questions.length > 0 && (
          <QuestionDisplay
            setCurrentStep={setCurrentStep}
            q={questions[currentStep]}
          />
        )}
      </div>
    </div>
  );
}
