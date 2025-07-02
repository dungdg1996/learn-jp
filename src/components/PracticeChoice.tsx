import React, { useMemo, useState } from "react";
import type { WordPair } from "../App";

type PracticeChoiceProps = {
  word: string; // Japanese word
  correctAnswer: string; // Vietnamese answer
  options: WordPair[];
  onCheck: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  userAnswer: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PracticeChoice: React.FC<PracticeChoiceProps> = ({
  word,
  correctAnswer,
  options,
  onCheck,
  showFeedback,
  userAnswer,
}) => {
  // Lấy 3 đáp án sai + 1 đáp án đúng, sau đó shuffle
  const choices = useMemo(() => {
    const wrongs = shuffle(options.filter((o) => o.vn !== correctAnswer)).slice(
      0,
      3
    );
    const all = shuffle([...wrongs.map((o) => o.vn), correctAnswer]);
    return all;
  }, [word, correctAnswer, options]);

  const [selected, setSelected] = useState<string>("");

  React.useEffect(() => {
    if (!showFeedback) setSelected("");
  }, [showFeedback, word]);

  const handleSelect = (choice: string) => {
    if (!showFeedback) {
      setSelected(choice);
      onCheck(choice);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center justify-center" style={{ minHeight: 100 }}>
        <span className="text-xl font-semibold text-blue-700 drop-shadow">
          {word}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {choices.map((choice) => {
          let btnColor = "border-gray-300 bg-white";
          if (showFeedback) {
            if (choice === correctAnswer)
              btnColor = "border-green-500 bg-green-100";
            else if (choice === userAnswer)
              btnColor = "border-red-500 bg-red-100";
          } else if (selected === choice) {
            btnColor = "border-blue-500 bg-blue-50";
          }
          return (
            <button
              key={choice}
              type="button"
              className={`border ${btnColor} rounded-xl px-4 py-3 text-base font-medium text-left shadow transition-colors duration-150 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                showFeedback
                  ? "cursor-default"
                  : "hover:border-blue-400 hover:bg-blue-50"
              }`}
              onClick={() => handleSelect(choice)}
              disabled={showFeedback}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeChoice;
