import {useEffect, useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import {Button} from "antd";
import { signOut } from "firebase/auth";


const LogoutButton = () =>
{
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <Button onClick={logout}>Log Out</Button>
  );
}

export default LogoutButton;