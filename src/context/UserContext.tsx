"use client";

import LoginDrawer from "@/components/LoginDrawer";
import { fetchUserByUid } from "@/functions/fetchUserById";
import { auth } from "@/lib/firebase";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  user: User | null;
}

interface UserProps {
  children: ReactNode;
}

// Define UserContext with type
const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

export function UserProvider({ children }: UserProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);

  useEffect(() => {
    setModalDisplay(auth.currentUser === null)
    if (auth.currentUser !== null) {
      fetchUserByUid(auth.currentUser.uid).then((data) => {
        if (data && data.points) {
          router.replace("/points");
        }
      });
    }
    // fix use Effect hook
  }, [auth.currentUser, router]);

  return (
    <UserContext.Provider value={{ user }}>
      <>
        {children}
        <LoginDrawer modalDisplay={modalDisplay} setUser={setUser} />
      </>
    </UserContext.Provider>
  );
}
