import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) {
  }

  user = {};
  username;
  password;
  firstName;
  lastName;
  userId;
  phone;
  email;
  address;
  sections = [];
  admin;

  update(user) {
    user = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };
    this.service.updateUser(user, this.userId)
      .then(() => alert('Profile successfully updated.'));
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  unenroll(section) {
    this.sectionService
      .unenrollStudentInSection(section._id)
      .then(sections => {
        this.sections = sections;
      });
  }

  ngOnInit() {
    this.service
      .profile()
      .then(user => {
        this.username = user.username;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phone = user.phone;
        this.email = user.email;
        this.address = user.address;
        this.userId = user._id;
        this.admin = user.username === 'admin';
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }
}
