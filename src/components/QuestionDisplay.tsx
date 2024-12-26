import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@prisma/client";

type QuestionDisplayProps = {
  currentStep: number;
  isLast: boolean;
  q: Question;
  setCurrentStep: (value: number | ((prev: number) => number)) => void;
  setUserScore: () => Promise<void>;
};

const QuestionDisplay = ({
  q,
  setCurrentStep,
  isLast,
  currentStep,
  setUserScore,
}: QuestionDisplayProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [finalLoading, setFinalLoading] = useState(false);

  const options = [q.optionA, q.optionB, q.optionC, q.optionD];

  const onSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const hasAnswered = JSON.parse(localStorage.getItem("answers") || "{}")?.[
      currentStep
    ];
    if (hasAnswered) {
      setSelectedOption(hasAnswered);
    }
  }, [currentStep]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    createRipple(e); // Trigger the ripple effect
    setTimeout(() => {
      setCurrentStep((prevStep) => {
        const userData = JSON.parse(localStorage.getItem("answers") || "{}");
        userData[prevStep] = selectedOption;
        localStorage.setItem("answers", JSON.stringify(userData));
        setSelectedOption(null);
        return prevStep + 1;
      });
    }, 300); // Allow ripple animation to play
  };

  const finalSubmit = () => {
    setFinalLoading(true);
    setCurrentStep((prevStep) => {
      const userData = JSON.parse(localStorage.getItem("answers") || "{}");
      userData[prevStep] = selectedOption;
      localStorage.setItem("answers", JSON.stringify(userData));
      return prevStep;
    });
    setUserScore().finally(() => {
      setFinalLoading(false)
    });
  };

  const createRipple = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 500); // Remove ripple after animation
  };

  const animationVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
  };

  return (
    <motion.div
      key={q.questionText}
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: "spring", stiffness: 50 }}
      className="w-full"
    >
      <Fragment>
        <h3 className="w-[80%] text-white m-auto text-center">
          {q?.questionText}?
        </h3>
        <h4 className="w-[80%] text-[#9fa1bc] text-sm m-auto text-center mt-3">
          Select the most appropriate option
        </h4>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-5">
          {options.map((option, index) => (
            <div
              key={`opt-${index}`}
              className={`bg-[#383e6e] cursor-pointer transition-all duration-300 text-center py-4 rounded-md text-white shadow-xl ${
                selectedOption === String.fromCharCode(65 + index)
                  ? "bg-gradient-to-br from-[#e25a9d] to-[#894ba8]"
                  : ""
              }`}
              onClick={() => onSelectOption(String.fromCharCode(65 + index))}
            >
              {option}
            </div>
          ))}
        </div>
        <button
          className={`relative overflow-hidden w-full py-2 shadow-xl rounded-xl my-5 text-white transition-all duration-500 ${
            selectedOption === null
              ? "bg-gray-500 cursor-not-allowed scale-y-90 opacity-50"
              : "bg-gradient-to-r from-[#347cca] to-[#3e9fff] scale-100 opacity-100"
          }`}
          onClick={isLast ? finalSubmit : onSubmit}
          disabled={selectedOption === null || finalLoading}
        >
          {isLast ? "Submit" : "Next"}
        </button>
      </Fragment>
    </motion.div>
  );
};

export default QuestionDisplay;
