import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHotTopic from "./CustomHotTopic";

const HotTopicsCard = () => {
  return (
    <Card className="hover:cursor-pointer hover:transition hover:-translate-y-[2px] col-span-4 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomHotTopic />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
