import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import HistoryComponent from "../HistoryComponent"
import { prisma } from "@/lib/db";
import { FileBarChart } from "lucide-react";

const RecentActivityCard = async () => {
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
    <Card className="col-span-4 hover:cursor-pointer hover:transition-transform hover:-translate-y-[3px] lg:col-span-3 bg-white border-l-0 border-t-0 dark:bg-gray-800 shadow-lg dark:hover:shadow-purple-300/60 rounded-lg overflow-hidden dark:border-b dark:border-r dark:border-purple-300">
      <CardHeader className="bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            <Link href="/history">Recent Activity</Link>
          </CardTitle>
          <FileBarChart size={35} strokeWidth={2.5} color="#d64ecd"/>
        </div>
        <CardDescription className="text-md text-muted-foreground mt-2 text-gray-500 dark:text-gray-300">
          See latest <span className="font-semibold text-gray-700 dark:text-gray-200">10</span> quizzes you have played.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll pl-2">
        <HistoryComponent limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
