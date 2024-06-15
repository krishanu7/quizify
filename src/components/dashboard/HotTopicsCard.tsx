import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomHotTopic from "../CustomHotTopic";
import { Flame } from "lucide-react";
import { prisma } from "@/lib/db";

const HotTopicsCard = async () => {
  const topics = await prisma.topicCount.findMany({});
  const formattedTopics = topics.map((topic) => ({
    text: topic.topic,
    value: topic.count,
  }));

  return (
    <Card className="hover:cursor-pointer hover:transition-transform hover:-translate-y-[3px] col-span-4 bg-white border-l-0 border-t-0 dark:bg-gray-800 shadow-lg dark:hover:shadow-purple-300/60 rounded-lg overflow-hidden dark:border-b dark:border-r dark:border-purple-300">
      <CardHeader className="bg-gray-100 dark:bg-gray-700">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Hot Topics
          </CardTitle>
          <Flame size={35} strokeWidth={2.5} color="#f58b52" />
        </div>
        <CardDescription className="text-md text-gray-900 dark:text-gray-200">
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomHotTopic formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
