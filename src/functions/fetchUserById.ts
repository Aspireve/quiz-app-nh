type User = {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    points: number;
  };
  
  type FetchUserResponse = {
    user?: User;
    error?: string;
  };
  
  export async function fetchUserByUid(uid: string): Promise<User | null> {
    try {
      const response = await fetch(`/api/user/${uid}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const errorData: FetchUserResponse = await response.json();
        console.error('Error fetching user:', errorData.error);
        return null;
      }
  
      const data: FetchUserResponse = await response.json();
      return data.user || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
  