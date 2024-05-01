import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Pages/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Root() {
  return (
    <>
      <NavBar />
      <h1>hello</h1>
      <ToastContainer hideProgressBar autoClose={3000} />

      <Outlet />
    </>
  );
}
