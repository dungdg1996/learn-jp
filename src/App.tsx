import React, { useState, useEffect } from "react";
import lesson3 from "./data/lesson3.json";
import LessonSelector from "./components/LessonSelector";
import PracticeInput from "./components/PracticeInput";
import PracticeChoice from "./components/PracticeChoice";
import Feedback from "./components/Feedback";
import NextButton from "./components/NextButton";

export type WordPair = {
  jp: string;
  vn: string;
};

type Mode = "input" | "choice";

type LessonMap = {
  [key: string]: WordPair[];
};

const lessons: LessonMap = {
  "Bài 3": lesson3,
};

const lessonKeys = Object.keys(lessons);

const getRandomIndex = (length: number, exclude?: number) => {
  let idx = Math.floor(Math.random() * length);
  if (exclude !== undefined && length > 1) {
    while (idx === exclude) {
      idx = Math.floor(Math.random() * length);
    }
  }
  return idx;
};

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("input");
  const [lesson, setLesson] = useState<string>(lessonKeys[0]);
  const [words, setWords] = useState<WordPair[]>(lessons[lessonKeys[0]]);
  const [currentIdx, setCurrentIdx] = useState<number>(
    getRandomIndex(lessons[lessonKeys[0]].length)
  );
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");

  // Khi đổi lesson
  useEffect(() => {
    setWords(lessons[lesson]);
    setCurrentIdx(getRandomIndex(lessons[lesson].length));
    setShowFeedback(false);
    setIsCorrect(null);
    setUserAnswer("");
  }, [lesson]);

  // Khi đổi mode
  useEffect(() => {
    setShowFeedback(false);
    setIsCorrect(null);
    setUserAnswer("");
  }, [mode]);

  const handleLessonChange = (newLesson: string) => {
    setLesson(newLesson);
    setCurrentIdx(getRandomIndex(lessons[newLesson].length));
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as Mode);
  };

  const handleCheck = (answer: string) => {
    setUserAnswer(answer);
    const correct =
      mode === "input"
        ? answer.trim() === words[currentIdx].jp
        : answer.trim() === words[currentIdx].vn;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (showFeedback) {
      setCurrentIdx(getRandomIndex(words.length, currentIdx));
      setShowFeedback(false);
      setIsCorrect(null);
      setUserAnswer("");
      return;
    }
    const correct =
      mode === "input"
        ? userAnswer.trim() === words[currentIdx].jp
        : userAnswer.trim() === words[currentIdx].vn;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-900 drop-shadow">
          Học từ vựng
        </h1>
        <div className="flex gap-4 justify-between items-center my-4 ">
          <LessonSelector
            lessons={lessonKeys}
            currentLesson={lesson}
            onChange={handleLessonChange}
          />
          <div className="flex items-center justify-around grow">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                value="input"
                checked={mode === "input"}
                onChange={handleModeChange}
                className="accent-blue-500"
              />
              <span className="ml-1">JP</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                value="choice"
                checked={mode === "choice"}
                onChange={handleModeChange}
                className="accent-pink-500"
              />
              <span className="ml-1">VN</span>
            </label>
          </div>
        </div>
        <div className="my-6">
          {mode === "input" ? (
            <PracticeInput
              word={words[currentIdx].vn}
              correctAnswer={words[currentIdx].jp}
              onCheck={handleCheck}
              onChange={(value) => setUserAnswer(value)}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              userAnswer={userAnswer}
            />
          ) : (
            <PracticeChoice
              word={words[currentIdx].jp}
              correctAnswer={words[currentIdx].vn}
              options={words}
              onCheck={handleCheck}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
              userAnswer={userAnswer}
            />
          )}
          <div style={{ minHeight: 75 }}>
            <Feedback
              show={showFeedback}
              isCorrect={isCorrect}
              correctAnswer={
                mode === "input" ? words[currentIdx].jp : words[currentIdx].vn
              }
              userAnswer={userAnswer}
            />
          </div>
        </div>
        <NextButton isCheck={!showFeedback} onClick={handleNext} />
      </div>
    </div>
  );
};

export default App;
