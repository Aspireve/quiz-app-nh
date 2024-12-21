interface RegisterUserPayload {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

export const registerUser = async (userData: RegisterUserPayload) => {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', (error as Error).message);
    throw error;
  }
};
