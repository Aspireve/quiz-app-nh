import React, { Fragment, useState } from "react";

type QuestionDisplayProps = {
  q: {
    question: string;
    options: string[];
  };
  setCurrentStep: (value: number | ((prev: number) => number)) => void; // Updated type
};

const QuestionDisplay = ({ q, setCurrentStep }: QuestionDisplayProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const onSelectOption = (option: number) => {
    setSelectedOption(option);
  };

  const onSubmit = () => {
    setCurrentStep((prevStep) => {
      const userData = JSON.parse(localStorage.getItem("answers") || "{}");
      userData[prevStep] = selectedOption;
      localStorage.setItem("answers", JSON.stringify(userData));
      return prevStep + 1; 
    });
  };

  return (
    <Fragment>
      <h3 className="w-[80%] text-white m-auto text-center">{q?.question}?</h3>
      <h4 className="w-[80%] text-[#9fa1bc] text-sm m-auto text-center mt-3">
        Select the most appropriate option
      </h4>
      <div className="grid grid-cols-2 grid-rows-2 gap-4  mt-5">
        {q?.options.map((option, index) => (
          <div
            key={`opt-${index}`}
            className={`bg-[#383e6e] cursor-pointer transition-all duration-300 text-center py-4 rounded-md text-white shadow-xl ${
              selectedOption === index
                ? "bg-gradient-to-br from-[#e25a9d] to-[#894ba8]"
                : ""
            }`}
            onClick={() => onSelectOption(index)}
          >
            {option}
          </div>
        ))}
      </div>
      <button
        className="bg-gradient-to-r from-[#347cca] to-[#3e9fff] text-white w-full py-2 shadow-xl rounded-xl my-5"
        onClick={onSubmit} // Add the onSubmit handler to the button
      >
        Next
      </button>
    </Fragment>
  );
};

export default QuestionDisplay;
