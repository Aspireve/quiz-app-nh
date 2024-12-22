import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { uid, answers } = JSON.parse(req.body);
  console.log(req.body.uid);

  if (!uid || !Array.isArray(answers)) {
    return res
      .status(400)
      .json({ message: "Invalid input. UID and answers are required." });
  }

  try {
    // Fetch the user with their assigned questions
    const userWithQuestions = await prisma.user.findUnique({
      where: { uid },
      include: {
        assignedQuestions: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!userWithQuestions) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the questions
    const questions = userWithQuestions.assignedQuestions.map((assignment) => ({
      id: assignment.question.id,
      question: assignment.question.questionText,
      options: [
        assignment.question.optionA,
        assignment.question.optionB,
        assignment.question.optionC,
        assignment.question.optionD,
      ],
      correctAnswer: assignment.question.correctOption,
    }));

    // Validate the length of answers and questions
    if (answers.length !== questions.length) {
      return res
        .status(400)
        .json({ message: "Answers array length must match questions length." });
    }

    // Calculate the score
    const score = answers.reduce((acc, answer, idx) => {
      return questions[idx].correctAnswer === answer ? acc + 10 : acc - 1;
    }, 0);

    await prisma.user.update({
      where: { uid },
      data: {
        points: score*25,
      },
    });

    res
      .status(200)
      .json({ message: "Score Found Correctly", questions, score: score * 25 });
  } catch (error) {
    console.error("Error fetching questions or calculating score:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
