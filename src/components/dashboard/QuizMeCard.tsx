"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';

const QuizMeCard = () => {
    const router = useRouter();
  return (
    <Card className='hover:cursor-pointer hover:transition hover:-translate-y-[2px]'
        onClick={()=> {
            router.push("/quiz");
        }}
    >
        <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='text-2xl font-bold'>Start Quiz</CardTitle>
            <MessageCircleQuestion  size={30} strokeWidth={2.5} className="mr-4"/>
        </CardHeader>
        <CardContent>
            <p className='text-sm text-muted-foreground'>
                Challenge yourself to a quiz with a topic of your choice.
            </p>
        </CardContent>
    </Card>
  )
}

export default QuizMeCard