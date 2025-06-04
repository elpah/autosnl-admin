import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/authButton/AuthButton";
import AuthForm from "../../components/authForm/AuthForm";
import AuthTemplate from "../../components/authTemplate/AuthTemplate";
import styles from "./signup.module.css";

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <AuthTemplate
      handleSubSpanClick={()=>navigate('/signin')}
        orText="or sign up with"
        logoHeader="ZaurAutos"
        subText="Already have an account? "
        subSpanText="Sign in"
      >
        <AuthForm showNameField={true}>
          <AuthButton text="Sign Up" />
        </AuthForm>
      </AuthTemplate>
      <div className={styles.right}> testing </div>
    </div>
  );
};

export default SignUp;
