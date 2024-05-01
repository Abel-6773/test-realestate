import { NavLink } from "react-router-dom";
import SignInForm from "../Components/SignInUp/SignInForm";
import OAuth from "../Components/SignInUp/OAuth";

export default function SignIn() {
  return (
    <div className="signIn containerXl">
      <header>
        <h1 className="pageHeader txtCntr">WelcomeBack!</h1>
      </header>
      <main>
        <SignInForm />
        <OAuth />
        <NavLink to="../sign-up" className="registerLink">
          Sign Up instead
        </NavLink>
      </main>
    </div>
  );
}
