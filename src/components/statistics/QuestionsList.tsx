"use client";
import { Question } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  return (
    <Table className="mt-4 w-full shadow-lg dark:shadow-purple-300/60 rounded-lg overflow-hidden">
      <TableCaption className="p-4 text-gray-600 font-semibold dark:text-gray-400">
        End of list.
      </TableCaption>
      <TableHeader className="bg-gray-100 dark:bg-gray-800">
        <TableRow>
          <TableHead className="w-[15px] p-2 border border-gray-300 dark:border-gray-700">
            No.
          </TableHead>
          <TableHead className="p-2 border border-gray-300 dark:border-gray-700">
            Question & Correct Answer
          </TableHead>
          <TableHead className="p-2 border border-gray-300 dark:border-gray-700">
            Your Answer
          </TableHead>
          {questions[0]?.questionType === "open_ended" && (
            <TableHead className="w-[10px] p-2 border border-gray-300 dark:border-gray-700 text-right">
              Accuracy
            </TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {questions.map(
          (
            {
              answer,
              question,
              userAnswer,
              percentageCorrect,
              isCorrect,
              questionType,
            },
            index
          ) => (
            <TableRow
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
            >
              <TableCell className="text-center font-medium p-2 border border-gray-300 dark:border-gray-700">
                {index + 1}
              </TableCell>
              <TableCell className="p-2 border border-gray-300 dark:border-gray-700">
                <span className="font-semibold">{question}</span> <br />
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  <span className="text-black dark:text-white">Ans:</span>{" "}
                  {answer}
                </span>
              </TableCell>
              {questionType === "open_ended" ? (
                <TableCell className="font-semibold p-2 border border-gray-300 dark:border-gray-700">
                  {userAnswer}
                </TableCell>
              ) : (
                <TableCell
                  className={`p-2 border border-gray-300 dark:border-gray-700 font-semibold ${
                    isCorrect
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {userAnswer}
                </TableCell>
              )}
              {percentageCorrect && (
                <TableCell className="text-center p-2 border border-gray-300 dark:border-gray-700">
                  {percentageCorrect}
                </TableCell>
              )}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
