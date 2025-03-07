export default function RedirectSolution({question, answer, solution, textAlign}: any) {
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