import {Component, OnInit} from '@angular/core';
import {SectionServiceClient} from '../services/section.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-admin-section-list',
  templateUrl: './admin-section-list.component.html',
  styleUrls: ['./admin-section-list.component.css']
})
export class AdminSectionListComponent implements OnInit {


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
  loaded = false;
  editing = false;
  selectedSection;

  loadSections(courseId) {
    if (courseId !== undefined) {
      this.loaded = true;
    }
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

  edit(sectionId) {
    this.editing = true;
    this.selectedSection = sectionId;
  }

  update(sectionId) {
    let currentSection = null;
    this.sections.filter(section => {
      if (sectionId === section._id) {
        currentSection = section;
      }
      return true;
    });
    this.service.updateSection(currentSection, sectionId)
      .then(sections => this.sections = sections);
    this.editing = false;
  }

  delete(sectionId) {
    this.service.deleteSection(sectionId, this.courseId)
      .then(response => this.sections = response);
  }

  ngOnInit() {
  }

}
