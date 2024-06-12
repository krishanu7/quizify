import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";

type Props = { accuracy: number };

const ResultsCard = ({ accuracy }: Props) => {
  return (
    <Card className="md:col-span-7 bg-white dark:bg-gray-800 shadow-lg dark:shadow-purple-300/60 dark:border-b-purple-300 dark:border-r-purple-300 rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 bg-gray-100 dark:bg-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Results
        </CardTitle>
        <Award className="h-7 w-7 ml-3 text-gray-600 dark:text-gray-300" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-3/5 mt-5">
        {accuracy > 75 ? (
          <>
            <Trophy className="mr-4" stroke="gold" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-400">
              <span className="">Impressive!</span>
              <span className="text-sm text-center text-black dark:text-white opacity-70">
                {"> 75% accuracy"}
              </span>
            </div>
          </>
        ) : accuracy > 25 ? (
          <>
            <Trophy className="mr-4" stroke="silver" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-stone-400">
              <span className="">Good job!</span>
              <span className="text-sm text-center text-black dark:text-white opacity-70">
                {"> 25% accuracy"}
              </span>
            </div>
          </>
        ) : (
          <>
            <Trophy className="mr-4" stroke="brown" size={50} />
            <div className="flex flex-col text-2xl font-semibold text-yellow-800">
              <span className="">Nice try!</span>
              <span className="text-sm text-center text-black dark:text-white opacity-70">
                {"< 25% accuracy"}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
