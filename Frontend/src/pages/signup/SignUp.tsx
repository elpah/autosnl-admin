import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/auth-button/AuthButton";
import AuthForm, { LoginInfo } from "../../components/auth-form/AuthForm";
import AuthTemplate from "../../components/auth-template/AuthTemplate";
import styles from "./signup.module.css";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, _setErrorMessage] = useState<string>("");
  const [signupInfo, setSignupInfo] = useState<LoginInfo>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className={styles.container}>
      <div className={styles.left_content}>
        <AuthTemplate
          handleSubSpanClick={() => navigate("/signin")}
          orText="or sign up with"
          logoHeader="ZaurAutos"
          subText="Already have an account? "
          subSpanText="Signs in"
        >
          <AuthForm
            loginInfo={signupInfo}
            setLoginInfo={setSignupInfo}
            showNameField={true}
            errorMessage={errorMessage}
          >
            <AuthButton
              handleSubmit={() => console.log("submitted")}
              text="Sign Up"
            />
          </AuthForm>
        </AuthTemplate>
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default SignUp;
