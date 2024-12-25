import { User } from "firebase/auth";

type FetchUserResponse = {
  topUsers?: User[];
  error?: string;
};

export async function fetchToppers(): Promise<User[] | null> {
  try {
    const response = await fetch(`/api/fetchTopper`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: FetchUserResponse = await response.json();
      console.error("Error fetching user:", errorData.error);
      return null;
    }

    const data: FetchUserResponse = await response.json();
    return data.topUsers || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
