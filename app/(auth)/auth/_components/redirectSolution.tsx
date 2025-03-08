import { MouseEventHandler } from "react";

interface RedirectSolutionType {
  question: string,
  answer: string,
  solution: MouseEventHandler,
  textAlign: string
}

export default function RedirectSolution({question, answer, solution, textAlign}: RedirectSolutionType) {
  return (
    <p className={`italic text-xs ${textAlign}`}>
      {`${question} `}
      <button
        onClick={solution}
        className="underline text-blue-600 italic"
      >
        {`${answer}`}
      </button>
    </p>
  );
}