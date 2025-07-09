import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/authButton/AuthButton";
import AuthForm from "../../components/authForm/AuthForm";
import AuthTemplate from "../../components/authTemplate/AuthTemplate";
import styles from "./signin.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <AuthTemplate
            handleSubSpanClick={()=>navigate('/signup')}

        orText="or sign in with"
        logoHeader="ZaurAutos"
        subText="You dont have an account? "
        subSpanText="Sign Up"
      >
        <AuthForm subText="Forgotten Password?">
          <AuthButton text="Sign In" />
        </AuthForm>
      </AuthTemplate>
      <div className={styles.right}> testing </div>
    </div>
  );
};

export default SignIn;
