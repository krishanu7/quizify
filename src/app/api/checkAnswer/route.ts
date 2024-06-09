import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { questionId, userInput } = checkAnswerSchema.parse(body);
        //console.log(questionId, userInput);
        const question = await prisma.question.findUnique({
            where: { id: questionId },
        });
        if (!question) {
            return NextResponse.json(
                { message: "Question not found", },
                { status: 404, }
            );
        }
        await prisma.question.update({
            where: { id: questionId },
            data: { userAnswer: userInput },
        });
        if (question.questionType === "mcq") {
            const isCorrect = question.answer.toLowerCase().trim() === userInput.toLowerCase().trim();
            await prisma.question.update({
                where: { id: questionId },
                data: { isCorrect },
            });
            return NextResponse.json({
                isCorrect,
            });
        } else if (question.questionType === 'open_ended') {
            //TODO
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    message: error.issues,
                },
                {
                    status: 400,
                }
            )
        }
    }
}