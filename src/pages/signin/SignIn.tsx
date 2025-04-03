import AuthButton from "../../components/authButton/AuthButton";
import AuthForm from "../../components/authForm/AuthForm";
import AuthTemplate from "../../components/authTemplate/AuthTemplate";
import styles from "./signin.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <AuthTemplate
        logoHeader="ZaurAutos"
        signInUpHeader="Sign in to ZaurAutos"
        signInUpText=" To keep connected with us please login with your personal
            information."
        subText="You dont have an account? "
        subSpanText="Sign Up"
      >
        <AuthForm>
          <AuthButton text="Sign In" />
        </AuthForm>
      </AuthTemplate>
      <div className={styles.right}> testing </div>
    </div>
  );
};

export default SignIn;
