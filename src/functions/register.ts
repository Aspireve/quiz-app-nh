import { RegisterUserApiReturn } from "@/types/apiTypes";
import { User } from "firebase/auth";

export const registerUser = async (userData: User) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data: RegisterUserApiReturn = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', (error as Error).message);
    throw error;
  }
};
