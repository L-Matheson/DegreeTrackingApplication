/*
 @Author Lucas Matheson

  Home.jsx displays a high level, quick overview of everything the degree 
  tracking application has to offer. 

*/
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import React, { useState, useEffect, useRef } from "react";
import { useMountEffect } from 'primereact/hooks';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { MeterGroup } from "primereact/metergroup";
import { Messages } from 'primereact/messages';
import "./HomeFormat.css";

export default function Home() {

  const msgs = useRef(null);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Check if the message has already been dismissed
    const messageDismissed = localStorage.getItem("messageDismissed");
    if (!messageDismissed) {
      setShowMessage(true); // Show the message if it hasn't been dismissed
    }
  }, []);

  useMountEffect(() => {
    if (msgs.current) {
        msgs.current.clear();
        msgs.current.show([
            { sticky: true, severity: 'info', summary: 'Enroll', detail: 'Fall 2025 enrollment is now open! Please enroll now during priority registeration' },
        ]);
    }
});

  const handleDismiss = () => {
    if (msgs.current) {
      msgs.current.clear(); 
    }
    localStorage.setItem("messageDismissed", true); 
  };

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
    <div className="flex flex-wrap gap-8">
      {values.map((item, index) => (
        <Card className="flex-1" key={index}>
          <div
            className="flex justify-content-between gap-4"
            style={{ width: 250 }}
          >
            <div className="flex flex-column gap-1">
              <span className="text-secondary text-sm">{item.label}</span>
              <span className="font-bold text-lg">{item.value}</span>
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
      <span>Total Credits</span>
      <span
        style={{ width: totalPercent + 4 + "%" }}
        className="absolute text-right"
      >
        {totalPercent + " Credits"}
      </span>
      <span className="font-medium">120 Credits</span>
    </div>
  );

  const totalCourses = [
    {
      label: "Credits Taken",
      color: "#34d399",
      value: 10,
      icon: "pi pi-book",
    },
    {
      label: "Credits Planned",
      color: "#fbbf24",
      value: 20,
      icon: "pi pi-briefcase",
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
          {showMessage && (
          <div style={{ padding: 10 }}>
            <Messages
              ref={msgs}
              style={{ height: 50 }}
              onRemove={handleDismiss} // Handle dismissal when the message is closed
            />
          </div>
        )}
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
            <Tag value="Major: Computer Science" rounded />
          </div>
          <div className="student-tag">
            <Tag value="Minor: Cyber Security" rounded />
          </div>
          <div className="student-tag">
            <Tag value="Graduate in Four Years" rounded />
          </div>
          <div className="student-tag">
            <Tag value="Sophomore" rounded />
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
            <Chip label="COS 430" style={{ fontWeight: 600 }} />
          </div>

          <div className="current-semester-class">
            {" "}
            <Chip label="COS 285" style={{ fontWeight: 600 }} />
          </div>
          <div className="current-semester-class">
            {" "}
            <Chip label="GEO 101" style={{ fontWeight: 600 }} />
          </div>
          <div className="current-semester-class">
            {" "}
            <Chip label="PHI 105" style={{ fontWeight: 600 }} />
          </div>
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
              padding: 20,
              color: "gray",
            }}
          >
            GPA
          </div>
          <div className="current-semester-courses">
            <div className="gpa">
              <div style={{ fontWeight: 600, color: "GrayText" }}>
                Spring 2025:
              </div>{" "}
              3.2
            </div>
            <div className="gpa">
              {" "}
              <div
                style={{ fontWeight: 600, color: "GrayText", width: "auto" }}
              >
                Overall:
              </div>{" "}
              3.2
            </div>
          </div>
          <div className="cell-footer">
            <Button label="View Transcript" size="small" />
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
          <div className="current-semester-courses">
            <div className="next-semester-class">
              {" "}
              <Chip label="COS 473" style={{ fontWeight: 600 }} />
            </div>
            <div className="next-semester-class">
              {" "}
              <Chip label="COS 350" style={{ fontWeight: 600 }} />
            </div>
            <div className="next-semester-class">
              {" "}
              <Chip label="ITP 210" style={{ fontWeight: 600 }} />
            </div>
            <div className="next-semester-class">
              {" "}
              <Chip label="MAT 110" style={{ fontWeight: 600 }} />
            </div>
          </div>
          <div className="cell-footer"> 
            <Button label="Full Course Catalog" size="small" />
            <Button label="Alter Courses" size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
