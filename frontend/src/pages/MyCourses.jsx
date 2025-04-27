// filepath: /c:/Users/kingo/OneDrive/Desktop/DegreeTrackingAPI/frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import "./MyCourses.css";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  //const [selectedCourses, setSelectedCourses] = useState([]);
  //temp stuff------------------------------------------------------------------------------------------------------------
  const semesters = [
    { name: "F 2024", courses: [
        { id: 1, name: "Math 101", description: "Intro to Math" },
      ]
    },
    { name: "S 2025", courses: [
        { id: 3, name: "Physics 101", description: "Intro to Physics" },
        { id: 4, name: "History 101", description: "World History" },
      ]
    },
    { name: "F 2025", courses: [
        { id: 5, name: "Chemistry 101", description: "Intro to Chemistry" },
        { id: 6, name: "English 101", description: "Intro to English" },
        { id: 2, name: "Biology 201", description: "Intro to Biology" },
      ]
    },
  ];

  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const currentCourses = semesters[currentSemesterIndex].courses;

  const onNextSemester = () => {
    if (currentSemesterIndex < semesters.length - 1) {
      setCurrentSemesterIndex(currentSemesterIndex + 1);
    }
  };

  const onPrevSemester = () => {
    if (currentSemesterIndex > 0) {
      setCurrentSemesterIndex(currentSemesterIndex - 1);
    }
  };

  
//end temp stuff------------------------------------------------------------------------------------------------------------
  // Defines course types, used in Course Type Filtering
  const [courseTypes] = useState(["Core", "Elective"]);

  // Fetch courses 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/courses/major/");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log(data)
        } else {
          console.error("Failed to fetch courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // The header above the table, contains the search bar and Courses title
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Courses</h4>
      </div>
    );
  };

  const courseTypeBodyTemplate = (rowData) => {
    return <span>{rowData.course_type}</span>;
  };

  const courseTypeFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={courseTypes}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        placeholder="Select a type"
        className="p-column-filter"
        showClear
      />
    );
  };

  const header = renderHeader();

  return (
    <div style={{ padding: 0 }}>
      <div style={{ textAlign: "left", backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 175 }}>
            My Courses
            <div className="flex" style={{ right: 0, position: "absolute" }}>
              <div className="p-inputgroup flex-1 gap-3" style={{ paddingTop: 1 }}>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search"> </InputIcon>
                  <InputText placeholder="Search..." style={{ width: 300, height: 25 }} />
                </IconField>
              </div>
              <div className="flex px-4" style={{ gap: 12 }}>
                <Button icon="pi pi-bell" rounded text style={{ height: 27, width: 27 }} />
                <Button icon="pi pi-cog" rounded text style={{ height: 27, width: 27 }} />
                <Button icon="pi pi-calendar" rounded text style={{ height: 27, width: 27 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="solid" style={{ padding: 0, marginTop: 0 }} />



      
      <div className = "myC-background">
        <div className="card flex justify-content-center gap-8">

                  <Button 
                    icon="pi pi-chevron-left" 
                    label="Last Semester" 
                    className="mr-8" 
                    onClick={onPrevSemester} 
                    disabled={currentSemesterIndex === 0} 
                    rounded
                  />
                  <h2 className="text-center">{semesters[currentSemesterIndex].name}</h2>
                  <Button 
                    icon="pi pi-chevron-right" 
                    label="Next Semester"  
                    iconPos="right" 
                    className="ml-8" 
                    rounded
                    onClick={onNextSemester}
                    disabled={currentSemesterIndex === semesters.length - 1}
                  />
                  

        </div>

      </div>

      <div style={{ margin: 30 }}>
        <DataTable
          value={currentCourses}
          header={header}
          rows={10}
          showGridlines
          dataKey="id"
          selection={selectedCourses}
          onSelectionChange={(e) => setSelectedCourses(e.value)}
          filterDisplay="menu"
          globalFilterFields={["name", "description"]}
          emptyMessage="Error finding courses, please try again"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: "14rem" }} />
          <Column field="description" header="Description" style={{ minWidth: "22rem" }} />
        </DataTable>
      </div>
    </div>
  );
}
