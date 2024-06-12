import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass } from "lucide-react";
import { formatTime } from '@/lib/utils';
import { differenceInSeconds } from "date-fns";

type Props = {
    timeStarted: Date;
    timeEnded: Date;
}

const TimeTakenCard = ({timeStarted, timeEnded}: Props) => {
  return (
    <Card className="md:col-span-4 bg-white dark:bg-gray-800  dark:shadow-purple-300/60 dark:border-b-purple-300 dark:border-r-purple-300 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-100 dark:bg-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Time Taken</CardTitle>
        <Hourglass className="w-7 h-7 ml-3 text-gray-600 dark:text-gray-300" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-md text-center font-semibold text-gray-800 dark:text-gray-200">
          {formatTime(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TimeTakenCard
