


import {useEffect, useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import {Affix} from "antd";
import { signOut } from "firebase/auth";


const CheckAuth = () =>
{
  const navigate = useNavigate();

  auth.onAuthStateChanged(function(user) {
    console.log("change auth")
    if (!user) {
      navigate('/login')
    }
  });

  return (
    <Affix style={{ position: 'absolute', top: 0, left: 0 }}>
        <div style={{width:"100%", height:"100%", backgroundColor:"red"}}></div>
    </Affix>
  );
}

export default CheckAuth;