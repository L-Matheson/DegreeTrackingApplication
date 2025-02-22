// filepath: /c:/Users/kingo/OneDrive/Desktop/DegreeTrackingAPI/frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Timeline } from "primereact/timeline";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

export default function Home() {
  const events = ["Spring 2025", "Fall 2025", "Spring 2026", "Fall 2026", "Spring 2027", "Fall 2027", "Spring 2028", "Fall 2028"];

  const courses = [
    { id: 1, name: 'Introduction to Computer Science', code: 'COS101', credits: 3, semester: 'Fall 2025', rating: 4, status: 'Completed' },
    { id: 2, name: 'Data Structures', code: 'COS201', credits: 4, semester: 'Spring 2026', rating: 5, status: 'In Progress' },
    { id: 3, name: 'Software Engineering', code: 'COS430', credits: 4, semester: 'Spring 2025', rating: 5, status: 'In Progress' },
    { id: 4, name: 'Algorithms', code: 'COS301', credits: 3, semester: 'Fall 2026', rating: 3, status: 'Planned' },
    { id: 5, name: 'Operating Systems', code: 'COS401', credits: 4, semester: 'Spring 2027', rating: 4, status: 'Planned' },
    { id: 6, name: 'Database Systems', code: 'COS501', credits: 3, semester: 'Fall 2027', rating: 2, status: 'Planned' },
  ];

  const header = <div className="table-header">Current Classes</div>;


  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={rowData.status === 'Completed' ? 'success' : rowData.status === 'In Progress' ? 'warning' : 'info'} />;
  };

  return (
    <div>
      <div
        className="text-900 font-bold text-4xl mb-3"
        style={{ textAlign: "left" }}
      >
        Home
      </div>
      <hr className="solid" style={{ marginBottom: 15 }} />
      <div className="grid">
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
        <div className="col-12 md:col-6 lg:col-3">
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

     {/* This could also be expanded and used in the Courses tab */}
              <DataTable value={courses}  tableStyle={{ maxWidth: '50rem', minWidth: '15rem' }} className="mt-4">
                <Column field="name" header="Course Name"></Column>
                <Column field="code" header="Course Code"></Column>
                <Column field="credits" header="Credits"></Column>
              </DataTable>
            
        
      <div className="lg:col-12">
        <div className="surface-0 shadow-2 p-6 border-1 border-50 border-round">
          <div className="card flex flex-column gap-3">
            <span className="block text-500 font-medium mb-3">
              Timeline to Graduation
            </span>
            <Timeline
              value={events}
              layout="horizontal"
              align="alternate"
              content={(item) => item}
              opposite={<span>&nbsp;</span>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}