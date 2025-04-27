import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import CustomDropList from "../GeneralComponents/CustomDropList";
import CourseHandler from "../GeneralComponents/courseHandler";

export default function CoreReq() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const toast = useRef(null);
  const [courseHandler] = useState(new CourseHandler());
  const addCourse = useRef(null);
  const [noSelectCoursesWarning, setNoSelectCoursesWarning] = useState(false);
  const [enrollVisable, setEnrollVisable] = useState(false);

  // Defines what filters can be used for what rows
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    prerequisite: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    course_type: { value: null, matchMode: FilterMatchMode.EQUALS },
    course_offered: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // Defines course types, used in Course Type Filtering
  const [courseTypes] = useState([
    "Computer Science",
    "Biology",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Engineering",
  ]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/courses/core/"
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log(data);
        } else {
          console.error("Failed to fetch courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Controls the filtering
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const enrolledCourses = new Map(); // Store enrolled courses, key is course name, value is semester

  const handleDropdownSelection = (name, semester) => {
    console.log(`Course: ${name} - Semester: ${semester}`);
    enrolledCourses.set(name, semester);
    console.log("Enrolled Courses:", enrolledCourses);
  };

  async function enrollCourse() {
    if (selectedCourses.length === 0) {
      setNoSelectCoursesWarning(true);
      toast.current.show({
        severity: "warn",
        summary: "No Courses",
        detail: "Please Select Course(s) Before Enrolling",
      });
      return;
    } else if (selectedCourses.length > 5) {
      setNoSelectCoursesWarning(true);
      toast.current.show({
        severity: "warn",
        summary: "Max Courses Exceeded",
        detail:
          "Max of Five Courses Exceeded, Please Deselect Courses and Try Again",
      });
    } else {
      setNoSelectCoursesWarning(false);
      setEnrollVisable(true);
      console.log("Selected Courses:", selectedCourses);
    }
  }

  // Calls the course handler to save the courses
  function handleEnroll() {
    selectedCourses.forEach((course) => {
      const semester = enrolledCourses.get(course.name);
      if (semester) {
        courseHandler
          .saveCourse(course, semester)
          .then((response) => {
            if (response.ok) {
              console.log("Course saved successfully:", course.name, semester);
              toast.current.show({
                severity: "success",
                summary: "Success",
                detail: `You have successfully enrolled in ${course.name} for ${semester}`,
              });
            } else {
              console.error("Failed to save course:", response.statusText);
              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: `Failed to enroll in ${course.name} for ${semester}, ensure you are not already enrolled`,
              });
            }
          })
          .catch((error) => {
            console.error("Error saving course:", error);
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: `Error enrolling in ${course.name} for ${semester}`,
            });
          });
      } else {
        console.error(`No semester selected for course: ${course.name}`);
        toast.current.show({
          severity: "warn",
          summary: "No Semester Selected",
          detail: `Please select a semester for ${course.name} before enrolling.`,
        });
      }
    });
  }

  // The header above the table, contains the search bar and Courses title
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Courses</h4>
        <Button
          ref={addCourse}
          icon="pi pi-plus"
          label="Add Course"
          className="p-button-success"
          onClick={enrollCourse}
          style={{ marginLeft: "auto" }}
        />
        <IconField iconPosition="left">
          <Toast ref={toast} />
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search courses..."
          />
        </IconField>
      </div>
    );
  };
  const header = renderHeader();

  // The footer of the dialog, contains the buttons for the dialog
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => [setEnrollVisable(false), console.log("Canceled")]}
        className="p-button-text"
      />
      <Button
        label="Enroll"
        icon="pi pi-check"
        onClick={() => [setEnrollVisable(false), handleEnroll()]}
        autoFocus
      />
    </div>
  );

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

  // The main return function, contains the table and the dialog
  return (
    <div style={{ padding: 0 }}>
      <div style={{ textAlign: "left", backgroundColor: "white", height: 50 }}>
        <div style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 15 }}>
          <div className="text-900 font-medium flex" style={{ width: 175 }}>
            Core Requirements
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

      <div style={{ margin: 15 }}>
        <DataTable
          value={courses}
          paginator
          header={header}
          rows={10}
          showGridlines
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[5, 10, 25, 50]}
          dataKey="id"
          selectionMode="checkbox"
          selection={selectedCourses}
          onSelectionChange={(e) => setSelectedCourses(e.value)}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={[
            "name",
            "description",
            "prerequisite",
            "co_requisite",
            "CoreRequirements",
            "course_offered",
            "course_type",
          ]}
          emptyMessage="Error finding courses, please try again"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
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
          <Column
            field="prerequisite"
            header="Prerequisite"
            filter
            sortable
            filterPlaceholder="Search by Prerequisite"
            filterField="prerequisite"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="co_requisite"
            header="Co-Requisite"
            sortable
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="CoreRequirement"
            header="Core Requirement(s)"
            filter
            sortable
            filterPlaceholder="Search by Core Requirements"
            filterField="CoreRequirement"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="course_offered"
            header="Course Offered"
            filterPlaceholder="Search by Semester"
            filter
            sortable
            filterField="course_offered"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="course_type"
            header="Course Type"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem" }}
            body={courseTypeBodyTemplate}
            filter
            filterElement={courseTypeFilterTemplate}
            filterPlaceholder="Search by Course Type"
          />
        </DataTable>
      </div>

      <div className="card flex justify-content-center">
        <Dialog
          header="Enroll Courses"
          visible={enrollVisable}
          style={{ width: "40vw" }}
          onHide={() => {
            if (!enrollVisable) return;
            setEnrollVisable(false);
          }}
          footer={footerContent}
        >
          <div className="selected-Courses">
            {selectedCourses.map((course) => (
              <div key={course.id}>
                <CustomDropList
                  course={course}
                  onSelectionChange={handleDropdownSelection}
                />
              </div>
            ))}
          </div>
        </Dialog>
      </div>
    </div>
  );
}