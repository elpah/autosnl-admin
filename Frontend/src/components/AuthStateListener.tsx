import { useContext, useEffect } from "react";
import { GlobalContext, initialUser } from "../context/GlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; 
import useGetUser from "../hooks/useGetUser";

const AuthStateListener = () => {
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { data, isLoading, error } = useGetUser(user.uid, user.email!);

		if (!isLoading && data && !error) {
          globalContext.setLoggedUser({
            firebaseUid: user.uid,
            email: user.email!,
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            profileImage: data.profileImage || "",
          });
        }
      } else {
        globalContext.setLoggedUser(initialUser);
      }
    });

    return () => unsubscribe();
  }, [globalContext.loggedUser]);

  return null;
};

export default AuthStateListener;
