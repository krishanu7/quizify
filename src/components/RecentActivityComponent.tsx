import { prisma } from "@/lib/db";
import React from "react";
import { ListTodo, BookOpenCheck, Clock } from "lucide-react";
import Link from "next/link";

type Props = {
  limit: number;
  userId: string;
};

const RecentActivityComponent = async ({limit, userId}: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: 'desc',
    },
  });
  return (
    <div className="space-y-8">
      {games.map(game => {
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {game.gameType === 'mcq' ? (
                <ListTodo className="mr-3" />
              ) : (
                <BookOpenCheck className="mr-3" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  className="text-base font-medium leading-none underline"
                  href={`/statistics/${game.id}`}>
                  {game.topic}
                  {
                    game.timeEnded!==null ? (
                        <span className="ml-3 text-muted-foreground">Completed</span>
                    ) : (
                        <span className="ml-3 text-muted-foreground">Incompleted</span>
                    )
                  }
                </Link>
                <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {game.gameType === 'mcq' ? 'Multiple Choice' : 'Open-Ended'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivityComponent;
