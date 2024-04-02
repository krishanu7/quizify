"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { History } from "lucide-react";

const HistoryCard = () => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:transition hover:-translate-y-[2px]"
      onClick={() => {
        router.push("/history");
      }}
    >
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History size={30} strokeWidth={2.5} className="mr-4"/>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          View your past quiz attempts.
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
