import React from 'react';

type NextButtonProps = {
  onClick: () => void;
};

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 font-bold text-lg transition"
      onClick={onClick}
    >
      Next
    </button>
  );
};

export default NextButton; 