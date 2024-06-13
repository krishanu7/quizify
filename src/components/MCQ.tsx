"use client";
import React, { useState } from "react";
import { Game, Question } from "@prisma/client";
import { Timer, Slash, ChevronRight, Loader2, BarChart2 } from "lucide-react";
import MCQCounter from "@/components/MCQCounter";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useMutation } from "@tanstack/react-query";
import { checkAnswerSchema, endGameSchema } from "@/schemas/forms/quiz";
import { z } from "zod";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { differenceInSeconds } from "date-fns";
import { cn, formatTime } from "@/lib/utils";

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
  const [now, setNow] = React.useState(new Date());
  const { toast } = useToast();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  //getting Question and Answer array
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  //Extracting options from the Question Array
  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  // Passing current selected option to store in the database
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
  // Stop timer of the game
  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.put(`/api/endGame`, payload);
      return response.data;
    },
  });
  // Update Timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);
  // Clock timer
  const formatElapsedTime = (startTime: Date, currentTime: Date) => {
    const seconds = differenceInSeconds(currentTime, startTime);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Pagination function
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
        if (questionIndex === game.questions.length - 1) {
          //End the game
          endGame()
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, questionIndex, game.questions.length, toast, endGame]);

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

  // IF game is ended redirect to the statistics page
  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white dark:text-gray-600 bg-orange-400 rounded-md whitespace-nowrap">
          You have Completed the Quiz in{" "}
          {formatTime(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart2 className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
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
          {mounted && formatElapsedTime(game.timeStarted, now)}
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
          className="mt-8 text-lg"
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
