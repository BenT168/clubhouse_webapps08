import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userList',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss']
})
export class UserListComponent implements OnInit {

  selectedUser = {};
  users = [];
  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  onSelect(user): void {
    this.selectedUser = user;
  }

  viewUser(selectedUser) {
    this.auth.view(selectedUser).subscribe(
      res => this.router.navigate(['/view'], this.selectedUser),
      error => this.toast.setMessage('invalid press!', 'danger')
    );
  }

}
