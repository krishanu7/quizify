import React from "react";
import { CheckCircle2, XCircle, Slash } from "lucide-react";
import { Card } from "./ui/card";

type Props = {
  correct_answers: number;
  wrong_answers: number;
};

const MCQCounter = ({ correct_answers, wrong_answers }: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
      <CheckCircle2 color="green" size={30} />
      <span className="mx-3 text-2xl text-[green]">{correct_answers}</span>
      <Slash className="mx-0.5 text-black dark:text-white font-bold text-xl" />
      <span className="mx-3 text-2xl text-[red]">{wrong_answers}</span>
      <XCircle color="red" size={30} />
    </Card>
  );
};

export default MCQCounter;
