/*
 @Author Lucas Matheson

  Home.jsx displays a high level, quick overview of everything the degree 
  tracking application has to offer. 

*/
import { Chip } from "primereact/chip";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { MeterGroup } from "primereact/metergroup";
import "./HomeFormat.css";
export default function Home() {
  const majorCoursesRemaining = [
    { label: "Major Credits Taken", value: 6 },
    { label: "Major Credits Left", color: "lightgray", value: 94 },
  ];

  const coreCoursesRemaining = [
    { label: "Core Credits Taken", value: 10 },
    { label: "Core Credits Left", color: "lightgray", value: 90 },
  ];

  const events = [
    "Spring 2025",
    "Fall 2025",
    "Spring 2026",
    "Fall 2026",
    "Spring 2027",
    "Fall 2027",
    "Spring 2028",
    "Fall 2028",
  ];

  const courses = [
    {
      id: 1,
      name: "Introduction to Computer Science",
      code: "COS 101",
      credits: 3,
      semester: "Fall 2025",
      rating: 4,
      status: "Completed",
    },
    {
      id: 2,
      name: "Data Structures",
      code: "COS 201",
      credits: 4,
      semester: "Spring 2026",
      rating: 5,
      status: "In Progress",
    },
    {
      id: 3,
      name: "Software Engineering",
      code: "COS 430",
      credits: 4,
      semester: "Spring 2025",
      rating: 5,
      status: "In Progress",
    },
    {
      id: 4,
      name: "Algorithms",
      code: "COS 301",
      credits: 3,
      semester: "Fall 2026",
      rating: 3,
      status: "Planned",
    },
    {
      id: 5,
      name: "Operating Systems",
      code: "COS 401",
      credits: 4,
      semester: "Spring 2027",
      rating: 4,
      status: "Planned",
    },
    {
      id: 6,
      name: "Database Systems",
      code: "COS 501",
      credits: 3,
      semester: "Fall 2027",
      rating: 2,
      status: "Planned",
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      <div style={{ textAlign: "left", backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 10 }}>
            Dashboard
            <div className="flex" style={{ right: 0, position: "absolute" }}>
              <div
                className="p-inputgroup flex-1 gap-3"
                style={{ paddingTop: 1 }}
              >
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search"> </InputIcon>
                  <InputText
                    placeholder="Search..."
                    style={{ width: 300, height: 25 }}
                  />
                </IconField>
              </div>
              <div className="flex px-4" style={{ gap: 12 }}>
                <Button
                  icon="pi pi-bell"
                  rounded
                  text
                  style={{ height: 27, width: 27 }}
                />
                <Button
                  icon="pi pi-cog"
                  rounded
                  text
                  style={{ height: 27, width: 27 }}
                />
                <Button
                  icon="pi pi-calendar"
                  rounded
                  text
                  style={{ height: 27, width: 27 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="solid" style={{ padding: 0, marginTop: 0 }} />

      <div className="overall-performance">
        <div className="performance-header">
          <div style={{ textAlign: "left", padding: 10, fontWeight: 600 }}>
            Welcome Test User - Freshman
          </div>
        </div>

        <div className="performace-banner">
          This banner will potentially contain all student information, such as
          id, major, minor, etc
        </div>

        <div className="performance-content">
          <div className="grid py-3" style={{ padding: 15 }}>
            <div className=" lg:col-4">
              <div className="surface-0  shadow-2 border-1 border-50 p-4 ">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">
                      Basic info here
                    </span>
                    <div className="text-900 font-medium text-xl">info</div>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-thumbtack text-blue-500 text-xl"></i>
                  </div>
                </div>
                <span className="text-green-500 font-medium">text </span>
                <span className="text-500"> text</span>
              </div>
            </div>

            <div className=" lg:col-4">
              <div className="surface-0  shadow-2 border-1 border-50 p-4 ">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">
                      Basic info here
                    </span>
                    <div className="text-900 font-medium text-xl">info</div>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-thumbtack text-blue-500 text-xl"></i>
                  </div>
                </div>
                <span className="text-green-500 font-medium">text </span>
                <span className="text-500"> text</span>
              </div>
            </div>

            <div className=" lg:col-4">
              <div className="surface-0  shadow-2 border-1 border-50 p-4 ">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">
                      Basic info here
                    </span>
                    <div className="text-900 font-medium text-xl">info</div>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-thumbtack text-blue-500 text-xl"></i>
                  </div>
                </div>
                <span className="text-green-500 font-medium">text </span>
                <span className="text-500"> text</span>
              </div>
            </div>
          </div>
        </div>

        <div className="performance-footer">
          <div
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 18,
              width: "55%",
            }}
          >
            <MeterGroup
              values={majorCoursesRemaining}
              style={{ fontWeight: 550 }}
            />
          </div>

          <div
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 18,
              width: "45%",
            }}
          >
            <MeterGroup
              values={coreCoursesRemaining}
              style={{ fontWeight: 550 }}
            />
          </div>
        </div>
      </div>
      <div className="current-semester-banner">
        <div className="current-semester-cell ">
          <div className="current-semester">
            <div style={{ textDecoration: "underline", fontWeight: 500 }}>
              Spring 2025
            </div>

            <div
              className=" text-500 font-small"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              12 credits
            </div>
          </div>
        </div>

        {/* Make into a for loop that runs through courses when available */}
        <div className="current-semester-courses">
          <div className="current-semester-class">
            {" "}
            <Chip label="COS 430"  />
          </div>

          <div className="current-semester-class">
            {" "}
            <Chip label="COS 285"  />
          </div>
          <div className="current-semester-class">
            {" "}
            <Chip label="GEO 101"  />
          </div>
          <div className="current-semester-class">
            {" "}
            <Chip label="PHI 105"  />
          </div>
        </div>
      </div>
      
      <div className="support-cells">

        
Advisor
      </div>
    </div>
  );
}
