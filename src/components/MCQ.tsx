"use client";
import React from "react";
import { Game, Question } from "@prisma/client";
import { Timer, Slash, ChevronRight } from "lucide-react";
import MCQCounter from "@/components/MCQCounter";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="mt-3">
          <p>
            <span className="text-slate-700 dark:text-zinc-300 font-semibold text-lg ">
              Topic
            </span>{" "}
            &nbsp;
            <span className="px-2 py-1 text-white text-lg rounded-lg font-semibold bg-slate-800 dark:bg-zinc-100 dark:text-gray-700">
              {game.topic}
            </span>
          </p>
        </div>
        <div className="flex self-start mt-3 text-slate-700 dark:text-zinc-300 font-semibold">
          <Timer className="mr-2 font-bold" />
          00:00
        </div>
        <div>
          <MCQCounter
            correct_answers={stats.correct_answers}
            wrong_answers={stats.wrong_answers}
          />
        </div>
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mt-2 text-center flex flex-row">
            <div className="px-2 py-1 text-white rounded-md bg-slate-800 dark:bg-zinc-100 dark:text-gray-700">
              {questionIndex + 1}
            </div>
            <Slash className="mx-0.5 text-black dark:text-white font-bold text-xl" />
            <div className="px-2 py-1 mx-0.5 text-white rounded-md bg-slate-800 dark:bg-zinc-100 dark:text-gray-700">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="ml-5 flex-grow text-lg text-black dark:text-white">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoice === index ? "default" : "secondary"}
              className="justify-start w-full py-8 mb-4"
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button variant="default" className="mt-2" size="lg">
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
