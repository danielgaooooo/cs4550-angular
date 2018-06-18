import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  loggedIn;
  admin;

  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  createSection(sectionName, seats) {
    this
      .service
      .createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  enroll(section) {
    if (this.admin) {
      alert('You cannot enroll in a course as an admin.');
    } else if (this.loggedIn) {
      this.service
        .enrollStudentInSection(section._id)
        .then((response) => {
          if (response.status === 403) {
            alert('This section is full.');
          }
          if (response.status === 404) {
            alert('Cannot enroll in same section twice');
          }
          if (response.status === 200) {
            this.router.navigate(['profile']);
          }
        });
    } else {
      alert('You must be logged in to enroll. Go back to home and log in.');
    }
  }

  ngOnInit() {
    this.userService.checkIfLoggedIn()
      .then(response => {
        this.loggedIn = response.status !== 404;
      })
      .then(() => {
        if (this.loggedIn) {
          this.userService.profile()
            .then(user => {
              this.admin = user.username === 'admin';
            });
        }
      });
  }

}
