import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  loggedIn;
  sections = [];

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient) {
  }

  ngOnInit() {
    this.service.checkIfLoggedIn()
      .then(response => {
        this.loggedIn = response.status !== 404;
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }
}
