class Course {
  constructor(
    name,
    description,
    prerequisite,
    coRequisite,
    credits,
    coreRequirements,
    courseOffered,
    courseType
  ) {
    this.name = name || "";
    this.description = description || "";
    this.prerequisite = prerequisite || "";
    this.coRequisite = coRequisite || "";
    this.credits = credits || "";
    this.coreRequirements = coreRequirements || "";
    this.courseOffered = courseOffered || "";
    this.courseType = courseType || "";
  }
}

class CourseHandler {
  constructor() {
    this.courses = []; // Define the array as a property of the class
  }

  /**
   * Fetches courses from the API and populates the `courses` array.
   */
  async fetchCourses() {
    if (this.courses.length === 0) {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/courses/enrolled/all"
        );
        if (response.ok) {
          const data = await response.json();
          this.courses = data;
          console.log("Courses fetched and stored:", this.courses);
          this.coursesStored = true;
        } else {
          console.error("Failed to fetch courses:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  }

  /**
   * Parses the `courses` array into a structured format.
   */
  parseCourses() {
    this.parsedCourses = this.courses.map((course) => {
      const lines = course.course_block.split("\n");
      return new Course(
        lines[0],
        lines[1],
        lines[2],
        lines[3],
        lines[4],
        lines[5],
        lines[6],
        lines[7]
      );
    });
    console.log("Parsed courses:", this.parsedCourses);
  }

// Takes a course and a semester as arguments and saves the course to the database as enrolled
  async saveCourse(course, semester) {
    for (const course of this.courses) {
      if (course.name === course.name) {
        return 'Already Enrolled'; // Exit if the course already exists
      }
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/courses/enrolled/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: course,
            progress: "Enrolled",
            semesterEnrolled: semester,
            gpa: "0",
          }),
        }
      );
      if (response.ok) {
        console.log("Course saved successfully:", course);
      } else {
        console.error("Failed to save course:", response.statusText);
      }
      return response;
    } catch (error) {
      console.error("Error saving course:", error);
      throw error;
    }
  }
}

export default CourseHandler;
