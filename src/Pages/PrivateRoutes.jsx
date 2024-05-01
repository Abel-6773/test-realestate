import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SignIn from "./SignIn";
import Profile from "./Profile";
import { useAuth } from "../Hooks/useAuth";
import Loading from "../Components/UI/Loading";

export default function PrivateRoutes() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return <div>{authenticated ? <Profile /> : <SignIn />}</div>;
}
