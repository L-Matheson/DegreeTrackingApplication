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

  // Todo: This should be an automatic function that fetches all the semesters a student is enrolled in,
  // along with grabbing the current semester from the backend.
  // For now, this is a temporary solution to test the functionality of the course table.
  const semesters = ["Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026"];

  const [currentSemesterIndex, setCurrentSemesterIndex] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [currentCourses, setCurrentCourses] = useState([
    {
      gpa: "",
      id: 0,
      name: "",
      progress: "",
      semesterEnrolled: "",
    },
  ]);

  async function fetchCourses(semester) {
    console.log(
      "Fetching courses for semester:",
      semester
    );
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/courses/enrolled/semester/${semester}/`
      );
      if (response.ok) {
        const fetchedCourses = await response.json();
        console.log("Courses fetched successfully:", fetchedCourses);

        // Update the state with the fetched courses
        setCurrentCourses(fetchedCourses);
      } else {
        console.error("Failed to fetch courses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  const onNextSemester = () => {
    if (currentSemesterIndex < semesters.length - 1) {
      const nextIndex = currentSemesterIndex + 1; // Calculate the next index
      setCurrentSemesterIndex(nextIndex); // Update the state
      fetchCourses(semesters[nextIndex]); // Pass the updated semester to fetchCourses
    }
  };
  
  const onPrevSemester = () => {
    if (currentSemesterIndex > 0) {
      const prevIndex = currentSemesterIndex - 1; // Calculate the previous index
      setCurrentSemesterIndex(prevIndex); // Update the state
      fetchCourses(semesters[prevIndex]); // Pass the updated semester to fetchCourses
    }
  };
  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/courses/enrolled/semester/Spring 2025/"
        );
        if (response.ok) {
          setCurrentCourses(await response.json());
          console.log("Courses fetched and stored:", this.courses);
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

      <div className="myC-background">
        <div className="card flex justify-content-center gap-8">
          <Button
            icon="pi pi-chevron-left"
            label="Last Semester"
            className="mr-8"
            onClick={onPrevSemester}
            disabled={currentSemesterIndex === 0}
            rounded
          />
          <h2 className="text-center">{semesters[currentSemesterIndex ]}</h2>
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
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="description"
            header="Description"
            style={{ minWidth: "22rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
