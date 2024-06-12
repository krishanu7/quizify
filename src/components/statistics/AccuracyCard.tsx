import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "lucide-react";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  accuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className="md:col-span-3 bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-300/60 dark:border-b-purple-300 dark:border-r-purple-300 rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-100 dark:bg-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Average Accuracy</CardTitle>
        <Goal className="w-7 h-7 ml-3 text-gray-600 dark:text-gray-300" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-md font-semibold text-gray-800 dark:text-gray-200">{accuracy.toString() + "%"}</div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
