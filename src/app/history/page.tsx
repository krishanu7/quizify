import HistoryComponent from "@/components/HistoryComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import { prisma } from "@/lib/db";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const games_count = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[500px] bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-400/60 dark:border-b-purple-300 dark:border-r-purple-300 rounded-xl overflow-hidden">
      <Card>
        <CardHeader className="bg-gray-100 dark:bg-gray-700">
          <div className="flex flex-row items-center justify-between mb-1">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              History
            </CardTitle>
            <Link
              className={buttonVariants({ variant: "button" })}
              href="/dashboard"
            >
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <CardDescription className="text-md text-muted-foreground mt-2 text-gray-500 dark:text-gray-300">
           You have played{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {games_count}
            </span>{" "}
            quizzes.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll flex flex-col gap-4 my-2">
          <HistoryComponent limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
