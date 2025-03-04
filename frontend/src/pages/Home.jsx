// filepath: /c:/Users/kingo/OneDrive/Desktop/DegreeTrackingAPI/frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { MeterGroup } from "primereact/metergroup";
import "./HomeFormat.css";
export default function Home() {
  const coursesRemaining = [
    { label: "Courses Taken", value: 15 },
    { label: "Courses Left", color: "lightgray", value: 85 },
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

        <div className="performance-content">
          <div className="grid py-3" style={{ padding: 15 }}>
            <div className=" lg:col-4">
              <div className="surface-0  p-4 ">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">
                      Classes this semester
                    </span>
                    <div className="text-900 font-medium text-xl">5</div>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-thumbtack text-blue-500 text-xl"></i>
                  </div>
                </div>
                <span className="text-green-500 font-medium">9 </span>
                <span className="text-500">until degree completion!</span>
              </div>
            </div>

            <div className="lg:col-4">
              <div className="surface-0 shadow-2 p-4 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">
                      Next Class
                    </span>
                    <div className="text-900 font-medium text-xl">COS 430</div>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-orange-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-check-circle text-orange-500 text-xl"></i>
                  </div>
                </div>
                <span className="text-green-500 font-medium">12:00 AM </span>
                <span className="text-500">Online</span>
              </div>
            </div>

            <div className="lg:col-4">
              <div className="surface-0 shadow-2 p-4 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">
                      Requirements met
                    </span>
                    <div className="text-900 font-medium text-xl">13</div>
                  </div>
                  <div
                    className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  >
                    <i className="pi pi-microchip text-cyan-500 text-xl"></i>
                  </div>
                </div>
                <span className="text-green-500 font-medium">9 </span>
                <span className="text-500">left!</span>
              </div>
            </div>
          </div>

          <div style={{ paddingLeft: 15, paddingRight: 15 }}>
            <MeterGroup values={coursesRemaining} style={{ fontWeight: 550 }} />
          </div>
        </div>

        <div className="performance-footer">footer</div>
      </div>

      {/* <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-4 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Classes this semester
                </span>
                <div className="text-900 font-medium text-xl">5</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-thumbtack text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">9 </span>
            <span className="text-500">until degree completion!</span>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-4 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Next Class
                </span>
                <div className="text-900 font-medium text-xl">COS 430</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-check-circle text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">12:00 AM </span>
            <span className="text-500">Online</span>
          </div>
        </div>

        <div className=" md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-4 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Requirements met
                </span>
                <div className="text-900 font-medium text-xl">13</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-microchip text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">9 </span>
            <span className="text-500">left!</span>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-4 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Current GPA
                </span>
                <div className="text-900 font-medium text-xl">3.42</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-graduation-cap text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-500">Current Goal: </span>
            {3.42 > 3.5 ? (
              <span className="text-green-500 font-medium">3.5 </span>
            ) : (
              <span className="text-red-500 font-medium">3.5 </span>
            )}
          </div>
        </div>
      </div>


      <DataTable value={courses} className="mt-4">
        <Column field="name" header="Course Name"></Column>
        <Column field="code" header="Course Code"></Column>
        <Column field="credits" header="Credits"></Column>
      </DataTable>  */}
    </div>
  );
}
