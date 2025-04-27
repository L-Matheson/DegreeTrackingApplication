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
          "http://127.0.0.1:8000/api/courses/enrolled/all/Spring 2025/p"
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

/*  Since prerequisites are not always in the same format, we need to extract them from the course block.
    This function will return either undefined or the prerequisite of a course
*/
async extractPrerequisites(prerequisite) {
  console.log("Prerequisite", prerequisite);
    if (!prerequisite || prerequisite === "None") {
      return undefined; // Return undefined if the prerequisite is null, undefined, or "None"
    }

    // Regular expression to match three capital letters followed by three numbers
    const regex = /([A-Z]{3}\d{3})/;

    // Use the regex to find the match
    const match = prerequisite.match(regex);

    // Return the matched prerequisite or undefined if no match is found
    return match ? match[0] : undefined;
  }



// Takes a course and a semester as arguments and saves the course to the database as enrolled
async saveCourse(course, semester) {

    let savedCourse = '';
    let credits = 3
    if(course.name != undefined) {
      savedCourse = course.name;
      credits = course.credits
    } else {
      savedCourse = course
    }

    for (const currCourse of this.courses) {
      if (savedCourse === currCourse.name) {
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
            name: savedCourse,
            progress: "Enrolled",
            semesterEnrolled: semester,
            gpa: "0",
            credits: credits,
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
