import AuthButton from "../../components/authButton/AuthButton";
import AuthForm from "../../components/authForm/AuthForm";
import AuthTemplate from "../../components/authTemplate/AuthTemplate";
import styles from "./signup.module.css";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <AuthTemplate
        logoHeader="ZaurAutos"
        signInUpHeader="Sign Up to ZaurAutos"
        signInUpText=" Enter your details to create an account"
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
