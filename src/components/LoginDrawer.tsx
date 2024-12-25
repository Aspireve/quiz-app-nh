import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { app } from "@/lib/firebase";
import { registerUser } from "@/functions/register";
import { useToast } from "@/hooks/use-toast";

interface LoginDrawerProps {
  modalDisplay: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function LoginDrawer({
  modalDisplay,
  setUser,
}: LoginDrawerProps) {
  
  const auth = getAuth(app);
  const { toast } = useToast();
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user); // Set the authenticated user
        registerUser(user).then(() => {
          toast({
            title: "User Registered",
            description: "User Registered and questions assigned successfully",
            color: "success",
          });
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          color: "error",
        });
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
            <Button onClick={signIn}>Sign In with Google</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
