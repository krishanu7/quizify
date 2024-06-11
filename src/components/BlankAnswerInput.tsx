import React from "react";
import keyword_extractor from "keyword-extractor";

type Props = {
  answer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const blank = "_____";

const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => {
  const [answerWithBlanks, setAnswerWithBlanks] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const keywords = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    // mix the keywords and pick 2
    const shuffled = keywords.sort(() => 0.5 - Math.random());
    const selectedKeywords = shuffled.slice(0, 2);

    const newAnswerWithBlanks = selectedKeywords.reduce((acc, curr) => {
      return acc.replaceAll(curr, blank);
    }, answer);

    setBlankAnswer(newAnswerWithBlanks);
    setAnswerWithBlanks(newAnswerWithBlanks);
    setMounted(true);
  }, [answer, setBlankAnswer]);

  // Prevent rendering on the server
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {answerWithBlanks.split(blank).map((part, index) => {
          return (
            <React.Fragment key={index}>
              {part}
              {index === answerWithBlanks.split(blank).length - 1 ? (
                ""
              ) : (
                <input
                  id="user-blank-input"
                  className="text-center border-b-2 border-black dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-none"
                  type="text"
                />
              )}
            </React.Fragment>
          );
        })}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;
