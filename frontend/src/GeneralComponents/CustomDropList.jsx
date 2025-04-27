import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./DropList.css";

export default function CustomDropList({ course, onSelectionChange }) {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const semesters = [];


  if (course.course_offered.toLowerCase().includes("fall")) {
    semesters.push({ name: "Fall 2024" });
    semesters.push({ name: "Fall 2025" });
    semesters.push({ name: "Fall 2026" });
    semesters.push({ name: "Fall 2027" });
    semesters.push({ name: "Fall 2028" });
    semesters.push({ name: "Fall 2029" });
  }
  if (course.course_offered.toLowerCase().includes("spring")) {
    semesters.push({ name: "Spring 2024" });
    semesters.push({ name: "Spring 2025" });
    semesters.push({ name: "Spring 2026" });
    semesters.push({ name: "Spring 2027" });
    semesters.push({ name: "Spring 2028" });
    semesters.push({ name: "Spring 2029" });
  }
  if (course.course_offered.toLowerCase().includes("summer")) {
    semesters.push({ name: "Summer 2024" });
    semesters.push({ name: "Summer 2025" });
    semesters.push({ name: "Summer 2026" });
    semesters.push({ name: "Summer 2027" });
    semesters.push({ name: "Summer 2028" });
    semesters.push({ name: "Summer 2029" });
  }
  if (course.course_offered.toLowerCase().includes("winter")) {
    semesters.push({ name: "Winter 2024" });
    semesters.push({ name: "Winter 2025" });
    semesters.push({ name: "Winter 2026" });
    semesters.push({ name: "Winter 2027" });
    semesters.push({ name: "Winter 2028" });
    semesters.push({ name: "Winter 2029" });
  }
  if (course.course_offered.toLowerCase().includes("every two years")) {
    semesters.push({ name: "Fall 2025" });
    semesters.push({ name: "Fall 2027" });
    semesters.push({ name: "Fall 2029" });
  }


  // Sorts the semesters in ascending order by year and season
  semesters.sort((a, b) => {
    const yearA = parseInt(a.name.split(" ")[1]);
    const yearB = parseInt(b.name.split(" ")[1]);
    const seasonA = a.name.split(" ")[0].toLowerCase();
    const seasonB = b.name.split(" ")[0].toLowerCase();

    if (yearA !== yearB) {
      return yearA - yearB; // Sort by year in ascending order
    } else {
      // Sort by season in the order of Fall, Spring, Summer, Winter
      const seasonOrder = ["winter","spring" ,"summer",  "fall" ];
      return seasonOrder.indexOf(seasonA) - seasonOrder.indexOf(seasonB);
    }
  });

  const handleDropdownChange = async (e) => {
     setSelectedSemester(e.value);

    if (onSelectionChange) {
      onSelectionChange(course.name, e.value.name); // Pass the course and selected semester to the parent
    }
    console.log("Selected semester:", selectedSemester, course);
  };

  return (
    <div className="list-group">
      <div key={course.id} className="singleLine">
        {course.name}
        <div style={{paddingLeft: "10px"}}>
        <Dropdown

value={selectedSemester}
onChange={handleDropdownChange}
options={semesters}
optionLabel="name"
placeholder="Select a Semester"
className="w-full md:w-14rem"
/>
        </div>
       
      </div>
    </div>
  );
}
