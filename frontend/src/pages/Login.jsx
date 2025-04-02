import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FloatLabel } from "primereact/floatlabel";
import "./LoginPage.css";
import "../App.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isRegistering) {
      // Register new user
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/student/create/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        );
        const data = response.json();

        if (response.ok) {
          setMessage("Account created! Please log in.");
          setIsRegistering(false);
        } else {
          setMessage(data.error || "Failed to create account.");
        }
      } catch (error) {
        console.error("Error creating account:", error);
        setMessage("Server error. Please try again.");
      }
    } else {
      // Log in user
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/student/${username}/${password}`,
          {
            method: "GET",
          }
        );
        const data = response.json();
        if (response.ok) {
          // Successful login
          onLogin(username); // Call the onLogin prop with the username
        } else {
          // Handle login failure
          setMessage(data.error || "Invalid username or password.");
        }
      } catch (error) {
        console.error("Error signing in: ", error);
        setMessage("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div style={{ textAlign: "left", backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 200 }}>
            Login
          </div>
        </div>
      </div>
      <hr
        className="solid"
        style={{ padding: 0, marginTop: 0, marginBottom: 100 }}
      />

      <div
        className="login-form"
        style={{
          width: 500,
          height: 500,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
        }}
      >
        <div className="login-title">
          {" "}
          <div style={{ paddingTop: "50px" }}>
            {" "}
            {isRegistering ? "Create Account" : "Sign In"}
          </div>
        </div>
        <div className="login-content">
          {message && <p style={{ color: "red" }}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="login-input-field">
            <div style={{ marginLeft: "25px", marginRight: "20px"}}>  
              <FloatLabel>
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </FloatLabel>
            </div>
            <div style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "25px", marginRight: "20px"}}>
              <FloatLabel>
                <InputText
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </FloatLabel>
            </div>
</div>
            <button type="submit">{isRegistering ? "Sign Up" : "Login"}</button>
          </form>
          <p>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ marginLeft: "10px" }}
            >
              {isRegistering ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
