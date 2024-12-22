type FetchScoreResponse = {
  score?: number;
  error?: string;
};

export async function fetchScoreByUid(uid: string): Promise<number | null> {
  try {
    const response = await fetch(`/api/fetchScore/${uid}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: FetchScoreResponse = await response.json();
      console.error("Error fetching user:", errorData.error);
      return null;
    }

    const data: FetchScoreResponse = await response.json();
    return data.score || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
