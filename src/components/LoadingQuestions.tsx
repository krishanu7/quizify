import React from "react";
import Image from "next/image";
import { Progress } from "./ui/progress";
type Props = { finished: boolean };

const loadingTexts = [
  "Generating questions...",
  "Igniting the flame of wonder and exploration...",
  "Unlocking the treasure chest of trivia...",
  "Crafting thought-provoking challenges...",
  "Embarking on a quest for answers...",
];

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(10);
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
  //Changing text
  React.useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  // For progress bar
  React.useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) return 0;
        const increment = Math.random() < 0.1 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 100);
    return () => clearInterval(progressInterval);
  }, [finished]);
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  w-[70vw] md:w-[60vw] flex flex-col items-center">
        <Image src={"/loading.gif"} width={400} height={400} alt="loading..."/>
        <Progress value={progress} className="w-full mt-4" />
        <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
};

export default LoadingQuestions;
