export class CourseServiceClient {
  COURSE_URL = 'https://cs4550-springboot.herokuapp.com/api/course';

  findAllCourses() {
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }
  findCourseById(courseId) {
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }
}
