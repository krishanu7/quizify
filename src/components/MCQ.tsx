"use client";
import React from "react";
import { Game, Question } from "@prisma/client";
import { Timer, Slash, ChevronRight, Loader2 } from "lucide-react";
import MCQCounter from "@/components/MCQCounter";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useMutation } from "@tanstack/react-query";
import { checkAnswerSchema } from "@/schemas/forms/quiz";
import { z } from "zod";
import axios from "axios";
import { useToast } from "./ui/use-toast";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const { toast } = useToast();
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      //console.log(response.data);
      return response.data;
    },
  });

  const handlePagination = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setStats((stats) => ({
            ...stats,
            correct_answers: stats.correct_answers + 1,
          }));
          toast({
            variant: "success",
            title: "Correct",
            description: "You got it right!",
          });
        } else {
          setStats((stats) => ({
            ...stats,
            wrong_answers: stats.wrong_answers + 1,
          }));
          toast({
            title: "Incorrect",
            description: "You got it wrong!",
            variant: "destructive",
          });
        }
        if(questionIndex === game.questions.length-1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, questionIndex , game.questions.length, toast]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      //console.log("Key down event:", key);

      if (key === "1") {
        setSelectedChoice(0);
      } else if (key === "2") {
        setSelectedChoice(1);
      } else if (key === "3") {
        setSelectedChoice(2);
      } else if (key === "4") {
        setSelectedChoice(3);
      } else if (key === "Enter") {
        handlePagination();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePagination]);

  if (hasEnded) {
    //TODO
  }
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
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={isChecking}
          onClick={() => {
            handlePagination();
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
