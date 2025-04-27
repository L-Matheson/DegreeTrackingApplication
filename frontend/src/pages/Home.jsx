/*
 @Author Lucas Matheson

  Home.jsx displays a high level, quick overview of everything the degree 
  tracking application has to offer. 

*/
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import React, { useState, useEffect, useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { MeterGroup } from "primereact/metergroup";
import { Messages } from "primereact/messages";
import "./HomeFormat.css";

export default function Home() {
  const msgs = useRef(null);
  const [majorCredits, setCredits] = useState(0);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [prevCourses, setPrevCourses] = useState([]);

  const [nextCourses, setNextCourses] = useState([]);

  useMountEffect(() => {
    if (msgs.current) {
      msgs.current.clear();
      msgs.current.show([
        {
          sticky: true,
          severity: "info",
          summary: "Enroll",
          detail:
            "Fall 2025 enrollment is now open! Please enroll now during priority registeration",
          closable: false,
        },
      ]);
    }
    loadData();
  });

  useEffect(() => {
    if (prevCourses.length > 0) {
      gatherCredits();
    }
  }, [prevCourses]);

  function gatherCredits() {
    for (const course of prevCourses) {
      if (course.credits) {
        setCredits(
          (prevCredits) => Number(prevCredits) + Number(course.credits)
        );
      } else {
        setCredits((prevCredits) => Number(prevCredits) + 3); // Default to 3 credits if not specified
      }
      console.log("Credits:", majorCredits);
    }
  }
  async function loadData() {
    // Fetchs all courses before Fall 2025
    try {
      const responseEnrolled = await fetch(
        "http://127.0.0.1:8000/api/courses/enrolled/all/Spring 2025/down"
      );
      if (responseEnrolled.ok) {
        const fetchedCourses = await responseEnrolled.json();
        setPrevCourses(fetchedCourses);
        console.log("Previous Courses fetched successfully:", fetchedCourses);
      } else {
        console.error("Failed to fetch courses:", responseEnrolled.statusText);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }

    // Fetch courses for the current semester
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/courses/enrolled/semester/Spring 2025/`
      );
      if (response.ok) {
        const fetchedCourses = await response.json();

        setCurrentCourses(fetchedCourses);
        console.log("Current courses fetched successfully:", currentCourses);
      } else {
        console.error("Failed to fetch courses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }

    // Fetch courses for the next semester
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/courses/enrolled/semester/Fall 2025/`
      );
      if (response.ok) {
        const fetchedCourses = await response.json();
        console.log("Courses fetched successfully:", fetchedCourses);
        setNextCourses(fetchedCourses);
      } else {
        console.error("Failed to fetch courses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }

    gatherCredits();
  }

  const meter = (props, attr) => (
    <span
      {...attr}
      key={props.index}
      style={{
        backgroundColor: props.color,
        width: props.percentage + "%",
      }}
    />
  );

  const labelList = ({ values }) => (
    <div className="flex flex-wrap gap-3 justify-content-center">
      {values.map((item, index) => (
        <Card className="flex-1" key={index} style={{ width: 240 }}>
          <div
            className="flex justify-content-between gap-4"
            style={{ width: 200 }}
          >
            <div className="flex flex-column gap-1">
              <span className="text-secondary text-sm">{item.label}</span>
              <span className="font-bold text-lg">
                {item.value} / {item.totalNeeded}
              </span>
            </div>
            <span
              className="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
              style={{ backgroundColor: item.color, color: "#ffffff" }}
            >
              <i className={item.icon} />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );

  const start = ({ totalPercent }) => (
    <div className="flex justify-content-between mt-3 mb-2 relative">
      <span>Total Credits Taken</span>
      {/* <span
        style={{ width: totalPercent + 4 + "%" }}
        className="absolute text-right"
      >
        {totalPercent + " Credits"}
      </span> */}
      <span className="font-medium">120 Credits</span>
    </div>
  );

  const totalCourses = [
    {
      label: "Core Credits Taken",
      color: "#34d399",
      value: 0,
      totalNeeded: 30,
      icon: "pi pi-check",
    },
    {
      label: "Major Credits Taken",
      color: "#fbbf24",
      value: majorCredits,
      totalNeeded: 80,
      icon: "pi pi-briefcase",
    },
    {
      label: "Elective Credits Taken",
      color: "#60a5fa",
      value: 0,
      totalNeeded: 10,
      icon: "pi pi-building-columns",
    },
    {
      label: "Remaining Credits",
      color: "lightgray",
      value: 120 - majorCredits,
      icon: "pi pi-globe",
      totalNeeded: 120,
      meterTemplate: meter,
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
            Welcome Test User
          </div>
        </div>

        <div style={{ padding: 10 }}>
          <Messages ref={msgs} style={{ height: 50 }} />
        </div>

        <div className="performance-content">
          <div style={{ padding: 10 }}>
            <div className="card flex justify-content-center">
              <MeterGroup
                labelPosition="start"
                values={totalCourses}
                start={start}
                meter={meter}
                labelList={labelList}
              />
            </div>
          </div>
        </div>

        <div className="performance-footer">
          <div className="student-tag">
            <Tag
              value="Computer Science requires 120 credits in total, 80-83 credits (depending on courses chosen to take) coming from major related courses, 30 credits from core courses and the rest of elective or
            minor related courses"
              rounded
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
          {currentCourses.map((course, index) => (
            <div key={index}>
              <Chip label={course.name} style={{ fontWeight: 600 }} />
            </div>
          ))}
        </div>
      </div>

      <div className="support-cells">
        <div className="support-cell">
          <div
            style={{
              fontWeight: 600,
              textAlign: "left",
              padding: 20,
              color: "gray",
            }}
          >
            Advisor
          </div>
          <div className="advisor-name" style={{ fontWeight: 600 }}>
            <div className="circle">FL</div>
            <div style={{ paddingLeft: 5 }}>First Lastname</div>
          </div>

          <div className="cell-footer">
            <Button label="Contact" size="small" />
          </div>
        </div>

        <div className="support-cell">
          <div
            style={{
              fontWeight: 600,
              textAlign: "left",
              paddingTop: 20,
              paddingLeft: 20,
              color: "gray",
            }}
          >
            Important Deadlines
          </div>
   
            <div className="gpa">
              <div
                style={{
                  paddingTop: 10,
                  paddingLeft: 20,
                  paddingRight: 10,
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  gap: 10
                }}
              >
                <li style={{ justifyContent: "space-between", display: "flex" }}> <div>Last Day of Courses</div> <div> May 2, 2025</div></li>
                <li
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div> Final Exams</div>
                  <div >May 3 - 9, 2025</div>
                </li>
                <li style={{ justifyContent: "space-between", display: "flex" }}> <div>2025 Commencement Ceremony</div><div> May 10, 2025</div></li>
                <li style={{ justifyContent: "space-between", display: "flex" }}> <div>Grade submission deadline</div> <div>May 19. 2025</div></li>
              </div>
            </div>
          
        </div>

        <div className="support-cell">
          <div
            style={{
              fontWeight: 600,
              textAlign: "left",
              padding: 20,
              color: "gray",
            }}
          >
            Fall 2025 Courses
          </div>
          <div className="next-semester-courses">
            {nextCourses.map((course, index) => (
              <div key={index}>
                <Chip label={course.name} style={{ fontWeight: 600 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
