import { prisma } from "@/lib/db";
import React from "react";
import { ListTodo, BookOpenCheck, Clock } from "lucide-react";
import Link from "next/link";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });

  return (
    <div className="p-3">
      {games.map((game) => (
        <div
          className="flex items-center justify-between p-4 mb-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          key={game.id}
        >
          <div className="flex items-center">
            {game.gameType === "mcq" ? (
              <ListTodo className="w-6 h-6 text-pink-500 mr-3" />
            ) : (
              <BookOpenCheck className="w-6 h-6 text-green-500 mr-3" />
            )}
            <div className="ml-4 space-y-1">
              <div className="flex flex-row items-center justify-between">
                <Link
                  className="text-base font-medium leading-none underline text-blue-700 dark:text-blue-500"
                  href={`/statistics/${game.id}`}
                >
                  {game.topic}
                </Link>
                {game.timeEnded !== null ? (
                  <span className="ml-3 px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                    Completed
                  </span>
                ) : (
                  <span className="ml-3 px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                    Incomplete
                  </span>
                )}
              </div>
              <p className="flex items-center px-2 py-1 text-xs text-black rounded-lg w-fit bg-teal-300">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(game.timeEnded ?? 0).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryComponent;
