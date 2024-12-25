import { Question } from "@prisma/client";

export const fetchUserQuestions = async (uid: string): Promise<Question[]> => {
  try {
    const response = await fetch("/api/getQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data: { questions: Question[] } = await response.json(); // Properly type the response data
    return data.questions;
  } catch (error) {
    console.error("Error fetching questions:", (error as Error).message);
    throw error;
  }
};
