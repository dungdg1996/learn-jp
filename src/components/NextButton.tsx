import React from "react";

type NextButtonProps = {
  onClick: () => void;
  isCheck?: boolean; // Optional prop to indicate if the button is for checking
};

const NextButton: React.FC<NextButtonProps> = ({ onClick, isCheck }) => {
  const buttonText = isCheck ? "Check" : "Next";
  return (
    <button
      type="button"
      className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 font-bold text-lg transition"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default NextButton;
