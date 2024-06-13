import QuizCreation from "@/components/QuizCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata = {
  title: "Quiz | Quizifi",
};

const QuizPage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <QuizCreation topic={searchParams.topic ?? ""}/>;
};
export default QuizPage;
