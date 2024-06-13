"use client";
import { Game, Question } from "@prisma/client";
import React from "react";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { differenceInSeconds } from "date-fns";
import { z } from "zod";
import { checkAnswerSchema, endGameSchema } from "@/schemas/forms/quiz";
import axios from "axios";
import { BarChart2, ChevronRight, Loader2, Slash, Timer } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn, formatTime } from "@/lib/utils";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import OpenEndedPercentage from "./OpenEndedPercentage";
import BlankAnswerInput from "./BlankAnswerInput";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEnded = ({ game }: Props) => {
  const [hasEnded, setHasEnded] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [blankAnswer, setBlankAnswer] = React.useState("");
  const [averagePercentage, setAveragePercentage] = React.useState(0);
  const { toast } = useToast();
  const [now, setNow] = React.useState(new Date());
  const [mounted, setMounted] = React.useState(false);

  //getting Question and Answer array
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  // Update Timer
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  //End game logic
  const {mutate: endGame} = useMutation({
    mutationFn: async () => {
      const payload : z.infer<typeof endGameSchema> = {
        gameId: game.id,
      }
      const response = await axios.put(`/api/endGame`, payload);
      return response.data;
    }
  })
  //  Passing current filled answer to store in the database
  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll<HTMLInputElement>("#user-blank-input").forEach((input) => {
        filledAnswer = filledAnswer.replace("_____", input.value);
        input.value  = "";
      });
      console.log(filledAnswer);
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer,
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  // Pagination function
  const handlePagination = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to the correct answer`,
        });
        setAveragePercentage((prev) => {
          return (prev + percentageSimilar) / (questionIndex + 1);
        });
        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }, [checkAnswer, questionIndex, game.questions.length, toast, endGame]);

  const formatElapsedTime = (startTime: Date, currentTime: Date) => {
    const seconds = differenceInSeconds(currentTime, startTime);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "Enter") {
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
          <OpenEndedPercentage percentage={averagePercentage} />
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
        {/* BlankAnwer Input */}
        <BlankAnswerInput
          setBlankAnswer={setBlankAnswer}
          answer={currentQuestion.answer}
        />
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

export default OpenEnded;
