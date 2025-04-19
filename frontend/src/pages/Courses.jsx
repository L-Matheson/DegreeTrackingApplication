import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Dropdown } from "primereact/dropdown";

export default function Courses() {
  const mockCourses = [
    {
      id: 1,
      name: "Introduction to Programming",
      description: "Learn the basics of programming using Python.",
      prerequisite: "None",
      co_requisite: "None",
      course_offered: "Fall, Spring",
      course_type: "Core",
    },
    {
      id: 2,
      name: "Data Structures",
      description: "Explore data organization and manipulation techniques.",
      prerequisite: "Introduction to Programming",
      co_requisite: "None",
      course_offered: "Spring",
      course_type: "Core",
    },
    {
      id: 3,
      name: "Database Systems",
      description: "Learn about relational databases and SQL.",
      prerequisite: "Data Structures",
      co_requisite: "None",
      course_offered: "Fall",
      course_type: "Elective",
    },
    {
      id: 4,
      name: "Operating Systems",
      description: "Understand the principles of operating systems.",
      prerequisite: "Data Structures",
      co_requisite: "None",
      course_offered: "Fall, Spring",
      course_type: "Core",
    },
    {
      id: 5,
      name: "Artificial Intelligence",
      description: "Introduction to AI concepts and techniques.",
      prerequisite: "Data Structures",
      co_requisite: "None",
      course_offered: "Spring",
      course_type: "Elective",
    },
    {
      id: 6,
      name: "Introduction to Programming",
      description: "Learn the basics of programming using Python.",
      prerequisite: "None",
      co_requisite: "None",
      course_offered: "Fall, Spring",
      course_type: "Core",
    },
    {
      id: 7,
      name: "Data Structures",
      description: "Explore data organization and manipulation techniques.",
      prerequisite: "Introduction to Programming",
      co_requisite: "None",
      course_offered: "Spring",
      course_type: "Core",
    },
    {
      id: 8,
      name: "Database Systems",
      description: "Learn about relational databases and SQL.",
      prerequisite: "Data Structures",
      co_requisite: "None",
      course_offered: "Fall",
      course_type: "Elective",
    },
    {
      id: 9,
      name: "Operating Systems",
      description: "Understand the principles of operating systems.",
      prerequisite: "Data Structures",
      co_requisite: "None",
      course_offered: "Fall, Spring",
      course_type: "Core",
    },
    {
      id: 10,
      name: "Artificial Intelligence",
      description: "Introduction to AI concepts and techniques.",
      prerequisite: "Data Structures",
      co_requisite: "None",
      course_offered: "Spring",
      course_type: "Elective",
    },
  ];

  const [courses, setCourses] = useState(mockCourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    prerequisite: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    course_type: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [courseTypes] = useState(["Core", "Elective"]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Courses</h4>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search courses..." />
        </IconField>
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
          <div className="text-900 font-medium flex" style={{ width: 10 }}>
            Courses
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
          globalFilterFields={["name", "description", "prerequisite", "co_requisite", "course_offered", "course_type"]}
          emptyMessage="No courses found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
          <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: "14rem" }} />
          <Column field="description" header="Description" style={{ minWidth: "14rem" }} />
          <Column field="prerequisite" header="Prerequisite" filter sortable filterPlaceholder="Search by Prerequisite"  filterField="prerequisite" style={{ minWidth: "12rem" }} />
          <Column field="co_requisite" header="Co-Requisite" sortable  style={{ minWidth: "12rem" }} />
          <Column field="course_offered" header="Course Offered" filterPlaceholder="Search by Semester"  filter sortable style={{ minWidth: "12rem" }} />
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
    </div>
  );
}
