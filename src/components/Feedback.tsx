import React from "react";

type FeedbackProps = {
  show: boolean;
  isCorrect: boolean | null;
  correctAnswer: string;
  userAnswer: string;
};

const Feedback: React.FC<FeedbackProps> = ({
  show,
  isCorrect,
  correctAnswer,
}) => {
  if (!show) return null;
  return (
    <div className="pt-4 flex justify-center">
      {isCorrect ? (
        <div className="text-green-700 bg-green-100 rounded-lg px-4 py-2 font-bold text-lg shadow">
          Chính xác!
        </div>
      ) : (
        <div className="text-red-700 bg-red-100 rounded-lg px-4 py-2 font-bold text-lg shadow">
          Sai. Đáp án đúng: <span className="underline">{correctAnswer}</span>
        </div>
      )}
    </div>
  );
};

export default Feedback;
