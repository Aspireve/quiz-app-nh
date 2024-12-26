import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { auth } from "@/lib/firebase";
import { registerUser } from "@/functions/register";
import { useToast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface LoginDrawerProps {
  modalDisplay: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function LoginDrawer({
  modalDisplay,
  setUser,
}: LoginDrawerProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    localStorage.clear();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        registerUser(user).then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setUser(data.user);
          toast({
            title: "User Registered",
            description: "User Registered and questions assigned successfully",
          });
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Drawer open={modalDisplay}>
      {modalDisplay && <div className="fixed inset-0 backdrop-blur-sm z-40" />}
      <DrawerContent>
        <div className="max-w-[500px] m-auto w-[95%]">
          <DrawerHeader>
            <DrawerTitle className="leading-6">
              You need to Sign In to answer the Quiz
            </DrawerTitle>
            <DrawerDescription>
              This enables us to track your points for the leaderboard.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {loading ? (
              <Skeleton className="h-[30px] w-full rounded-md" />
            ) : (
              <Button onClick={signIn}>Sign In with Google</Button>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
