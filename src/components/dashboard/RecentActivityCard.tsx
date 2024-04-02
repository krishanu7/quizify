import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const RecentActivityCard = () => {
  return (
    <Card className="col-span-4 hover:cursor-pointer lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
        You have played a total of 5 quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
        <p className="text-muted-foreground"> History Component </p>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
