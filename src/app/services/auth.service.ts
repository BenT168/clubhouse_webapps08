import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isCurrent = false;
  isCompany = false;
  isSociety = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { _id: '', username: '', organisation: '', location: '', category: '', sector: '' };
  viewUser = { _id: '', username: '', organisation: '', location: '', category: '', sector: '' };

  constructor(private userService: UserService,
              private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  view(user) {
    return this.userService.getUser(user).map(res => res.json()).map(
      res => {
        this.setViewUser(user);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isCurrent = false;
    this.isCompany = false;
    this.isSociety = false;
    this.currentUser = { _id: '', username: '', organisation: '', location: '', category: '', sector: '' };
    this.viewUser = { _id: '', username: '', organisation: '', location: '', category: '', sector: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.isCurrent = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.organisation = decodedUser.organisation;
    this.currentUser.location = decodedUser.location;
    this.currentUser.category = decodedUser.category;
    this.currentUser.sector = decodedUser.sector;
    decodedUser.category === 'company' ? this.isCompany = true : this.isSociety = true;
    delete decodedUser.category;

  }

  setViewUser(decodedUser) {
    this.loggedIn = true;
    this.isCurrent = false;
    this.viewUser._id = decodedUser._id;
    this.viewUser.username = decodedUser.username;
    this.viewUser.organisation = decodedUser.organisation;
    this.viewUser.location = decodedUser.location;
    this.viewUser.category = decodedUser.category;
    this.viewUser.sector = decodedUser.sector;
  }

}
