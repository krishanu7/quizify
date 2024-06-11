import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import stringSimilarity from "string-similarity";

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
            }, { status: 200 });
        } else if (question.questionType === 'open_ended') {
            let percentageSimilar = stringSimilarity.compareTwoStrings(
                question.answer.toLowerCase().trim(),
                userInput.toLowerCase().trim()
            ) // return value between 0-1
            percentageSimilar = Math.round(percentageSimilar * 100);
            await prisma.question.update({
                where: { id: questionId },
                data: { percentageCorrect: percentageSimilar },
            })
            return NextResponse.json({
                percentageSimilar,
            }, { status: 200 })
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