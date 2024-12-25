import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ message: "Missing user UID" });
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
      questionText: assignment.question.questionText,
      optionA: assignment.question.optionA,
      optionB: assignment.question.optionB,
      optionC: assignment.question.optionC,
      optionD: assignment.question.optionD,
    }));

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
