"use client";

import LoginDrawer from "@/components/LoginDrawer";
import { fetchUserByUid } from "@/functions/fetchUserById";
import { app } from "@/lib/firebase";
import { getAuth, User } from "firebase/auth";
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
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    if (auth.currentUser === null) {
      setModalDisplay(true);
    } else {
      setModalDisplay(false);
      fetchUserByUid(auth.currentUser.uid).then((data) => {
        if (data?.points !== 0) {
          router.push("/points");
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
