import { PrismaClient, Question } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { uid, displayName, photoURL, email } = req.body;

  if (!uid || !displayName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let user = await prisma.user.findUnique({ where: { uid } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          uid,
          displayName,
          photoURL,
          email,
        },
      });
      const numberOfQuestions = parseInt(
        process.env.NUMBER_OF_QUESTIONS || "10",
        10
      );
      const questions = await prisma.$queryRawUnsafe<Question[]>(
        `SELECT * FROM "Question" ORDER BY RANDOM() LIMIT ${numberOfQuestions}`
      );
      const assignments = questions.map((question) => ({
        userId: `${user?.uid}`,
        questionId: question.id,
      }));

      await prisma.userQuestions.createMany({ data: assignments });
    }
    res.status(201).json({
      message: "User registered and questions assigned successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
