import React from "react";
import { Card } from "@/components/ui/card";
import { Percent, Target } from "lucide-react";

type Props = {
  percentage: number;
  questionIndex: number;
};

const OpenEndedPercentage = ({ percentage, questionIndex }: Props) => {
  return (
    <Card className="flex flex-row items-center p-2">
      <Target size={30} />
      <span className="ml-3 text-2xl opacity-75">
        { questionIndex!==0 ? (percentage / (questionIndex)).toFixed(2) : 0 }
      </span>
      <Percent className="" size={25} />
    </Card>
  );
};

export default OpenEndedPercentage;
