import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FloatLabel } from "primereact/floatlabel";
import CourseHandler from "../GeneralComponents/courseHandler";

import capResults from "./core/cap_results.json";
import createResults from "./core/create_results.json";
import cultureResults from "./core/culture_results.json";
import engDes from "./core/eng_des.json";
import engagedResults from "./core/engaged_results_1.json";
import equityResults from "./core/equity_results.json";
import ethicResults from "./core/ethic_results.json";
import internResults from "./core/intern_results.json";
import reasonResults from "./core/reason_results.json";
import scienceResults from "./core/science_results.json";
import sociResults from "./core/soci_results.json";
//import * as fs from 'node:fs/promises';
//import * as path from 'path';
import "./LoginPage.css";
import "../App.css";
import { Dialog } from "primereact/dialog";

export default function Login({ onLogin }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentEmail, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isRegistering) {
      // Register new user
      try {
        const createUserResponse = await fetch(
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

        const data = createUserResponse.json();

        if (createUserResponse.ok) {
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
        const studentLoginResponse = await fetch(
          `http://127.0.0.1:8000/api/student/${loginUsername}/${loginPassword}`,
          {
            method: "GET",
          }
        );
        
        if (studentLoginResponse.ok) {
          // Successful login
          const data = studentLoginResponse.json();

          //Start of code for major courses
          try {
            const majorCoursesResponse = await fetch(
              "http://127.0.0.1:8000/api/courses/major/"
            );
            if (majorCoursesResponse.ok) {
              const courseData = await majorCoursesResponse.json();
              console.log(courseData);

              if (courseData.length <= 0) {
                const dataCourse = require("./cos_req.json");
                console.log(dataCourse.course);

                /*
                 * This is where courses will be initally processed
                 * In a real world scenerio, this would already be stored
                 *
                 * REDO THIS ALGORITHM ITS TERRIBLE AND MAKES ME WANT TO VOMIT
                 *
                 */
                for (let i = 0; i < dataCourse.course.length; i++) {
                  const x = dataCourse.course[i];
                  let test = x.course_block.split("\n");

                  let name = "";
                  let description = "";
                  let prerequisite = "";
                  let co_requisite = "";
                  let course_offered = "";
                  let course_type = "";
                  let credits = "";
                  let coreRequirement = "";

                  if (test.length === 8) {
                    name = test[0];
                    description = test[1];
                    prerequisite = test[2];
                    co_requisite = test[3];
                    credits = test[4];
                    coreRequirement = test[5];
                    course_offered = test[6];
                    course_type = test[7];
                  } else {
                    name = test[0];
                    description = test[1];
                    prerequisite = test[2];
                    co_requisite = test[3];
                    credits = test[4];
                    coreRequirement = "None";
                    course_offered = test[5];
                    course_type = test[6];
                  }

                  course_offered = course_offered.replace(
                    "Course Typically Offered: ",
                    ""
                  );
                  course_type = course_type.replace("Course Type: ", "");
                  prerequisite = prerequisite.replace("Prerequisite(s):", "");
                  co_requisite = co_requisite.replace("Co-requisite(s):", "");
                  credits = credits.replace("Credits: ", "");

                  if (prerequisite === "") {
                    prerequisite = "None";
                  }
                  if (co_requisite === "") {
                    co_requisite = "None";
                  } else {
                    co_requisite = co_requisite.replace(/\.$/, "");
                  }
                  if (course_offered === "Course Typically Offered:") {
                    course_offered = "Fall and Spring";
                  }

                  const postedCourse = await fetch(
                    "http://127.0.0.1:8000/api/courses/major/create",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name,
                        description,
                        prerequisite,
                        co_requisite,
                        credits,
                        CoreRequirement: coreRequirement,
                        course_offered,
                        course_type,
                      }),
                    }
                  );
                }
              }
            } else {
              console.log("no data found");
            }    
          } catch (error) {
            console.log("no data found");
          }

          //Start of code for core courses
          try {
            const coreCoursesResponse = await fetch(
              "http://127.0.0.1:8000/api/courses/core/"
            );
            if (coreCoursesResponse.ok) {
              const coreCourseData = await coreCoursesResponse.json();
              console.log(coreCourseData, 'core');

              if (coreCourseData.length <= 0) {
                // const fs =require('fs');
                // const path = require('path');
                // const courseLists =  fs.readdir('./core');
                const courseLists = [
                  capResults,
                  createResults,
                  cultureResults,
                  engDes,
                  engagedResults,
                  equityResults,
                  ethicResults,
                  internResults,
                  reasonResults,
                  scienceResults,
                  sociResults,
                ];             
                // courseLists.map( async (file) => {
                for( let currFile = 0; currFile < courseLists.length; currFile++){
                // const dataCoreCourse = require(path.join('./core', file));
                const dataCoreCourse = courseLists[currFile]; // Access the JSON data directly
                console.log(dataCoreCourse.course, ' Current JSON');
                /*
                 * This is where courses will be initally processed
                 * In a real world scenerio, this would already be stored
                 *
                 * REDO THIS ALGORITHM ITS TERRIBLE AND MAKES ME WANT TO VOMIT
                 *
                 */
                for (let currCourse = 0; currCourse < dataCoreCourse.course.length; currCourse++) {
                  const x = dataCoreCourse.course[currCourse];
                  let test = x.course_block.split("\n");

                  let name = "";
                  let description = "";
                  let prerequisite = "";
                  let co_requisite = "";
                  let course_offered = "";
                  let course_type = "";
                  let credits = "";
                  let coreRequirement = "";

                  if (test.length === 8) {
                    name = test[0];
                    description = test[1];
                    prerequisite = test[2];
                    co_requisite = test[3];
                    credits = test[4];
                    coreRequirement = test[5];
                    course_offered = test[6];
                    course_type = test[7];
                  } else {
                    name = test[0];
                    description = test[1];
                    prerequisite = test[2];
                    co_requisite = test[3];
                    credits = test[4];
                    coreRequirement = "None";
                    course_offered = test[5];
                    course_type = test[6];
                  }

                  course_offered = course_offered.replace(
                    "Course Typically Offered: ",
                    ""
                  );
                  course_type = course_type.replace("Course Type: ", "");
                  prerequisite = prerequisite.replace("Prerequisite(s):", "");
                  co_requisite = co_requisite.replace("Co-requisite(s):", "");
                  credits = credits.replace("Credits: ", "");

                  if (prerequisite === "") {
                    prerequisite = "None";
                  }
                  if (co_requisite === "") {
                    co_requisite = "None";
                  } else {
                    co_requisite = co_requisite.replace(/\.$/, "");
                  }
                  if (course_offered === "Course Typically Offered:") {
                    course_offered = "Fall and Spring";
                  }

                  const postedCourse = await fetch(
                    "http://127.0.0.1:8000/api/courses/core/create",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name,
                        description,
                        prerequisite,
                        co_requisite,
                        credits,
                        CoreRequirement: coreRequirement,
                        course_offered,
                        course_type,
                      }),
                    }
                  );
                }
              } 
              // );
            }
            } else {
              console.log("no data found a");
            }    
          } catch (error) {
            console.log("no data found b");
          }

          onLogin(username);
          //end of new user code block
        } else {
          //  login failure
          setMessage("Invalid username or password, Please Try Again");
        }
      } catch (error) {
        console.error("Error signing in: ", error);
        setMessage("Server error. Please try again.");
      }
    }
  };

  function handleLoser() {
    console.log("loser");
    onLogin("username"); // Call the onLogin prop with the username
  }

  return (
    <div className="login-container">
      <div style={{ backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 200 }}>
            Login
            {/* This is a development button to avoid using docker to login */}
            <Button
              onClick={handleLoser}
              style={{ minWidth: 500, marginLeft: 200 }}
            >
              {" "}
              Listen, I don't want to use docker, just take me to the app,
              remember to atleast create one account and log in once to get the
              classes though{" "}
            </Button>
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
          width: 425,
          height: 450,
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <p style={{ color: "red", fontWeight: 'bold' }}>{message}</p>
          </div>
        )}
          <form onSubmit={handleSubmit}>
            <div
              className="login-input-field"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FloatLabel>
                <InputText
                  id="username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  <label htmlFor="password">Password</label>
                </FloatLabel>
              </div>

              <Button
                label="Login"
                style={{
                  width: "18vh",
                  textAlign: "center",
                }}
                onClick={handleSubmit}
              ></Button>
            </div>
          </form>

          <div
            type="submit"
            style={{
              width: "100%",
              paddingBottom: "10px",

              textAlign: "center",
              fontWeight: "bold",
              bottom: "0",
              position: "absolute",
            }}
          >
            <Button
              type="Create Account"
              icon="pi pi-user-plus"
              label="Create Account"
              onClick={() => [
                setVisible(true),
                setIsRegistering(!isRegistering),
              ]}
              style={{ width: "25vh" }}
            >
              {" "}
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        header="Create Account"
        visible={isRegistering}
        onHide={() => {
          if (!isRegistering) return;
          setIsRegistering(false);
        }}
        style={{ width: "36vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {message && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <p style={{ color: "red" }}>{message}</p>
          </div>
        )}

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
          <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
      </Dialog>
    </div>
  );
}
