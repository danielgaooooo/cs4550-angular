export class LessonServiceClient {

  LESSON_URL = 'https://cs4550-springboot.herokuapp.com/api/course/COURSE_ID/module/MODULEID/lesson';

  findLessonsForModule(moduleId) {
    return fetch(this.LESSON_URL.replace('MODULEID', moduleId))
      .then(response => response.json());
  }
}
