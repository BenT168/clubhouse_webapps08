import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FilterService } from '../services/filter.service';

import { SorterService } from '../services/sorter.service';
import { TrackByService } from '../services/trackby.service';

@Component({
  selector: 'app-userList',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss']
})
export class UserListComponent implements OnInit {

  selectedUser : string;
  users : any[] = [];
  filteredUsers : any[] = [];
  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private router: Router,
              private userService: UserService,
              private sorterService: SorterService,
              public trackbyService: TrackByService,
              private filterService: FilterService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = this.filteredUsers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  sort(prop: string) {
      this.sorterService.sort(this.users, prop);
  }

  filterChanged(data: string) {
    if (data && this.users) {
        data = data.toUpperCase();
        const props = ['username', 'location', 'organisation', 'sector'];
        this.filteredUsers = this.filterService.filter<any>(this.users, data, props);
    }
    else {
      this.filteredUsers = this.users;
    }
  }

}
