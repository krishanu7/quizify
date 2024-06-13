import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHotTopic from "../CustomHotTopic";
import { prisma } from "@/lib/db";

const HotTopicsCard = async () => {
  const topics = await prisma.topicCount.findMany({});
  const formattedTopics = topics.map(topic => ({
    text: topic.topic,
    value: topic.count
  }));

  return (
    <Card className="hover:cursor-pointer hover:transition hover:-translate-y-[2px] col-span-4 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
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
