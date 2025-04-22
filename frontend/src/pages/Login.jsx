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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentEmail, setEmail] = useState("");
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
            body: JSON.stringify({
              username,
              password,
              firstName,
              lastName,
              studentEmail,
            }),
          }
        );

        const data = response.json();

        const dataCourse = require("./cos_req.json");
        console.log(dataCourse.course);

        for (let i = 0; i < dataCourse.course.length; i++) {
          const x = dataCourse.course[i];
          let test = x.course_block.split("\n");

          console.log(test);
          let name = test[0];
          let description = test[1];
          let prerequisite = test[2];
          let co_requisite = test[3];
          let course_offered = test[4];
          let course_type = test[5];
          const postedCourse = await fetch(
            "http://127.0.0.1:8000/api/courses/major/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                description,
                prerequisite,
                co_requisite,
                course_offered,
                course_type,
              }),
            }
          );
        }

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

        if (response.ok) {
          // Successful login
          const data = response.json();
          onLogin(username); // Call the onLogin prop with the username
        } else {
          // Handle login failure
          setMessage("Invalid username or password, Please Try Again");
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
          {message && (
            <p style={{ color: "red", marginBottom: "25px" }}>{message}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="login-input-field">
              <FloatLabel>
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "100%" }}
                />
                <label htmlFor="username">Username</label>
              </FloatLabel>

              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "15px",
                }}
              >
                <FloatLabel>
                  <InputText
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  <label htmlFor="password">Password</label>
                </FloatLabel>
              </div>
              {isRegistering && (
                <div>
                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "15px",
                    }}
                  >
                    <FloatLabel>
                      <InputText
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ width: "100%" }}
                      />
                      <label htmlFor="firstName">First Name</label>
                    </FloatLabel>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "15px",
                    }}
                  >
                    <FloatLabel>
                      <InputText
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ width: "100%" }}
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </FloatLabel>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "15px",
                    }}
                  >
                    <FloatLabel>
                      <InputText
                        id="email"
                        value={studentEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%" }}
                      />
                      <label htmlFor="email">Email</label>
                    </FloatLabel>
                  </div>
                </div>
              )}
            </div>
          </form>
          <div
            type="submit"
            style={{
              width: "85%",
              padding: "10px 0",
              paddingLeft: "0",
              textAlign: "center",
              fontWeight: "bold",
              bottom: "0",
              position: "absolute",
            }}
          >
            <Button onClick={handleSubmit}>
              {" "}
              {isRegistering ? "Sign Up" : "Login"}{" "}
            </Button>
            <p
              style={{
                fontWeight: "bold",
                marginTop: 20,
                cursor: "pointer",
                textDecoration: "underline",
                textAlign: "center",
              }}
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Sign In" : "Create An Account"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
