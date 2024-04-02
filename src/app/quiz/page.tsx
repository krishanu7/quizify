import QuizCreation from "@/components/QuizCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
type Props = {};

export const metadata = {
  title: "Quiz | Quizifi",
};

const QuizPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <QuizCreation />;
};
export default QuizPage;
