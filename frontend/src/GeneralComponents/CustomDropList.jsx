import React from "react";

export default function SelectedCoursesList({ courses }) {
  if (!courses || courses.length === 0) {
    return <p>No courses selected.</p>;
  }

  return (
    <ul className="list-group">
      {courses.map((course) => (
        <li key={course.id} className="list-group-item">
          {course.name}
        </li>
      ))}
    </ul>
  );
}