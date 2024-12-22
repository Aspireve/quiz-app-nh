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
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user, token);
        setUser(user); // Set the authenticated user
        registerUser({
          uid: user.uid || "Default",
          displayName: user.displayName || "Default",
          photoURL: user.photoURL || "Default",
          email: user.email || "Default",
        }).then((data) => {
          console.log(data);
          toast({
            title: "User Registered",
            description: "User Registered and questions assigned successfully",
            color: "success",
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Sign-in error:", {
          errorCode,
          errorMessage,
          email,
          credential,
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
