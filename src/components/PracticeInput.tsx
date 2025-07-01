import React, { useState, useRef } from "react";

type PracticeInputProps = {
  word: string; // Vietnamese word
  correctAnswer: string; // Japanese answer
  onCheck: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  userAnswer: string;
};

const PracticeInput: React.FC<PracticeInputProps> = ({
  word,
  onCheck,
  showFeedback,
  isCorrect,
  userAnswer,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Nếu userAnswer đã có (tức là đã trả lời), giữ nguyên input
  React.useEffect(() => {
    if (!showFeedback) setInput("");
  }, [showFeedback]);

  React.useEffect(() => {
    if (!showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showFeedback]);

  React.useEffect(() => {
    if (showFeedback) {
      // Tìm button Next và focus
      const nextBtn = document.querySelector(
        'button[type="button"],button[type=button]'
      );
      if (nextBtn) {
        (nextBtn as HTMLButtonElement).focus();
      }
    }
  }, [showFeedback]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showFeedback) {
      onCheck(input);
    }
  };

  let borderColor = "border-gray-300";
  if (showFeedback) {
    borderColor = isCorrect ? "border-green-500" : "border-red-500";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 150 }}
      >
        <span className="text-xl font-semibold text-pink-700 drop-shadow">
          {word}
        </span>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={showFeedback ? userAnswer : input}
        onChange={handleInputChange}
        disabled={showFeedback}
        className={`border ${borderColor} rounded-lg px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm w-full transition`}
        autoFocus
        inputMode="text"
        autoCapitalize="none"
      />
      <div className="mt-1">
        <span className="text-xs text-gray-400">
          * Để nhập Hiragana, hãy chuyển IME sang tiếng Nhật (JP) hoặc sử dụng
          bàn phím tiếng Nhật.
        </span>
        <br />
        <span className="text-xs text-gray-400">
          * Ctrl + Caps Lock: Higarana
        </span>
        <br />
        <span className="text-xs text-gray-400">
          * Alt + Caps Lock: Katakana
        </span>
      </div>
    </form>
  );
};

export default PracticeInput;
