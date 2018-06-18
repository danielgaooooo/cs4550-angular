export class SectionServiceClient {

  SECTION_URL = 'https://cs4550-node.herokuapp.com/api/course/COURSEID/section';
  STUDENT_SECTION_URL = 'https://cs4550-node.herokuapp.com/api/student/SECTION_ID/section';
  SPECIFIC_SECTION_URL = 'https://cs4550-node.herokuapp.com/api/section/SECTION_ID';

  deleteSection(sectionId, courseId) {
    return fetch(this.SPECIFIC_SECTION_URL.replace('SECTION_ID', sectionId), {
      method: 'delete',
      credentials: 'include'
    }).then(() => this.findSectionsForCourse(courseId));
  }


  findSectionsForStudent() {
    return fetch(this.STUDENT_SECTION_URL.replace('/SECTION_ID', ''), {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    return fetch(this.STUDENT_SECTION_URL.replace('SECTION_ID', sectionId), {
      method: 'post',
      credentials: 'include'
    });
  }

  unenrollStudentInSection(sectionId) {
    return fetch(this.STUDENT_SECTION_URL.replace('SECTION_ID', sectionId), {
      method: 'delete',
      credentials: 'include'
    }).then(() =>
      this.findSectionsForStudent());
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSection(section, sectionId) {
    return fetch(this.SPECIFIC_SECTION_URL.replace('SECTION_ID', sectionId), {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }
}
