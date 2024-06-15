"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { History } from "lucide-react";

const HistoryCard = () => {
  const router = useRouter();
  return (
    <Card className="hover:cursor-pointer hover:transition-transform hover:-translate-y-[2px] bg-white border-l-0 border-t-0 dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-purple-300/60 rounded-lg overflow-hidden dark:border-b dark:border-r dark:border-purple-300"
      onClick={() => {
        router.push("/history");
      }}
    >
      <CardHeader className="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-700">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History size={30} strokeWidth={2.5} className="mr-4 text-teal-400"/>
      </CardHeader>
      <CardContent>
        <p className='text-md text-muted-foreground mt-2'>
          View your past quiz attempts.
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
