import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const handleScrollToTop = () => {
  if (document.documentElement.scrollTop !== undefined) {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};

export const handleSignOut = async (navigate: (path: string) => void) => {
  try {
    await signOut(auth);
    navigate("/signin");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
