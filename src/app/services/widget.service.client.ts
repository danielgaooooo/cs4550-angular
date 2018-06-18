export class WidgetServiceClient {
  WIDGET_URL = 'https://cs4550-springboot.herokuapp.com/api/lesson/LESSON_ID/widget';

  findWidgetsForLesson(lessonId) {
    return fetch(this.WIDGET_URL.replace('LESSON_ID', lessonId))
      .then(response => response.json());
  }
}
