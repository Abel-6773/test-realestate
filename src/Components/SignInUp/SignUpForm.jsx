// import "./SignInForm.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../firebase.config";
import { serverTimestamp } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

import ArrowRightIcon from "../../assets/svg/keyboardArrowRightIcon.svg?react";

let initialFormData = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const formUpdater = function (e) {
    setFormData((c) => {
      return { ...c, [e.target.name]: e.target.value };
    });
    // console.log(formData);
  };
  const viewPassword = function () {
    setShowPassword((c) => {
      return !c;
    });
    // console.log(showPassword);
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const formDataCopy = { ...formData };
      formDataCopy.timeStamp = serverTimestamp();
      delete formDataCopy.password;
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");

      updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast.error("error siging you up");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={formUpdater}
        className="nameInput"
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={formData.name}
      />
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
      <NavLink className="forgotPasswordLink">Forgot Password</NavLink>
      <div className="signInBar">
        <h2 className="signInText">Sign Up</h2>
        <button className="signInButton">
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}
