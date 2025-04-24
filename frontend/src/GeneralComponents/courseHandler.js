class Course {
    constructor(name, description, prerequisite, coRequisite, credits, coreRequirements, courseOffered, courseType) {
        this.name = name || '';
        this.description = description || '';
        this.prerequisite = prerequisite || '';
        this.coRequisite = coRequisite || '';
        this.credits = credits || '';
        this.coreRequirements = coreRequirements || '';
        this.courseOffered = courseOffered || '';
        this.courseType = courseType || '';
    }
}

class CourseHandler {
    constructor(rawCourses) {
        this.rawCourses = rawCourses;
        this.parsedCourses = [];
    }

    /**
     * Parses raw course data into a structured format.
     */
    parseCourses() {
        this.parsedCourses = this.rawCourses.map(course => {
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
    }

    /**
     * Validates a single course object.
     * @param {Course} course - The course object to validate.
     * @returns {Boolean} - True if valid, false otherwise.
     */
    validateCourse(course) {
        return course.name && course.description && course.credits;
    }

    /**
     * Sends a course to the API for saving.
     * @param {Object} course - The course object to send.
     * @returns {Promise<Response>} - The API response.
     */
    async saveCourse(course) {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/courses/major/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course),
            });
            return response;
        } catch (error) {
            console.error("Error saving course:", error);
            throw error;
        }
    }

    /**
     * Processes and saves all parsed courses.
     */
    async processCourses() {
        if (this.parsedCourses.length === 0) {
            this.parseCourses();
        }

        for (const course of this.parsedCourses) {
            if (this.validateCourse(course)) {
                try {
                    const response = await this.saveCourse(course);
                    if (!response.ok) {
                        console.error(`Failed to save course: ${course.name}`);
                    }
                } catch (error) {
                    console.error(`Error processing course: ${course.name}`, error);
                }
            } else {
                console.warn(`Invalid course data: ${JSON.stringify(course)}`);
            }
        }
    }
}

export default CourseHandler;