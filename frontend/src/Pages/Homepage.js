import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "../components/Authentication/login.css"; 

function Homepage() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <div className="login-box">
      <p className="title">Chattify</p>
      <div className="tabs-header">
        <button
          className={activeTab === "login" ? "tab active" : "tab"}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={activeTab === "signup" ? "tab active" : "tab"}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
      </div>
      <div className="tabs-content">
        {activeTab === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default Homepage;
