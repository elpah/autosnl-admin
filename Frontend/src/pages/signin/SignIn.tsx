import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/auth-button/AuthButton";
import AuthForm, { LoginInfo } from "../../components/auth-form/AuthForm";
import AuthTemplate from "../../components/auth-template/AuthTemplate";
import styles from "./signin.module.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GlobalContext } from "../../context/GlobalContext";

const SignIn = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!globalContext.authLoading && globalContext.authUser) {
      navigate("/dashboard");
    }
  }, [globalContext.authUser]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      await userCredentials.user.getIdToken();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid email of password");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <AuthTemplate
        handleSubSpanClick={() => navigate("/signup")}
        orText="or sign in with"
        logoHeader="ZaurAutos"
        subText="You dont have an account? "
        subSpanText="Sign Up"
      >
        <AuthForm
          loginInfo={loginInfo}
          setLoginInfo={setLoginInfo}
          subText="Forgotten Password?"
          errorMessage={errorMessage}
        >
          <AuthButton handleSubmit={handleSignIn} text="Sign In" />
        </AuthForm>
      </AuthTemplate>
      <div className={styles.right}></div>
    </div>
  );
};

export default SignIn;
