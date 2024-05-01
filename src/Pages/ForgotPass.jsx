import React from "react";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?react";
export default function ForgotPass() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("If the email exists the link will be sent");
    } catch (error) {
      console.log(error);
      toast.error("could not send reset email");
    }
  };
  return (
    <div className="containerXl">
      <div className="pageHeader">
        <p>Forgot Password</p>
      </div>
      <form action="" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="email"
          className="emailInput"
          name="email"
          placeholder="Email"
        />
        <NavLink className="forgotPasswordLink" to="/sign-in">
          Sign In
        </NavLink>
        <div className="signInBar">
          <div className="signInText">send Reset Link</div>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>
    </div>
  );
}
