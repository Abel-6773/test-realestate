import "./SignInForm.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import ArrowRightIcon from "../../assets/svg/keyboardArrowRightIcon.svg?react";
let initialFormData = {
  email: "",
  password: "",
};
export default function SignInForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const formUpdater = function (e) {
    setFormData((c) => {
      return { ...c, [e.target.name]: e.target.value };
    });
    console.log(formData);
  };
  const viewPassword = function () {
    setShowPassword((c) => {
      return !c;
    });
    console.log(showPassword);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;

    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      navigate("/profile");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage, errorCode);
      toast.error("error");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={formUpdater}
        className="emailInput"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
      />
      <div className="passwordInputDiv">
        <input
          onChange={formUpdater}
          className="passwordInput"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
        />
        <img
          onClick={viewPassword}
          className="showPassword"
          src="../assets/svg/visibilityIcon.svg"
          alt=""
        />
      </div>
      <NavLink to="../forgot-password" className="forgotPasswordLink">
        Forgot Password
      </NavLink>
      <div className="signInBar">
        <h2 className="signInText">Sign In</h2>
        <button className="signInButton">
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}
