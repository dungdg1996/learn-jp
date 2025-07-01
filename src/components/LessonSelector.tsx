import React from 'react';

type LessonSelectorProps = {
  lessons: string[];
  currentLesson: string;
  onChange: (lesson: string) => void;
};

const LessonSelector: React.FC<LessonSelectorProps> = ({ lessons, currentLesson, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="font-semibold text-blue-700 text-lg">Lesson:</label>
      <select
        value={currentLesson}
        onChange={e => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 shadow-sm text-base focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
      >
        {lessons.map(lesson => (
          <option key={lesson} value={lesson}>{lesson}</option>
        ))}
      </select>
    </div>
  );
};

export default LessonSelector; 