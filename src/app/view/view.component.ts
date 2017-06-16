import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user = {};
  isLoading = true;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.user).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  message(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('message is delivered!', 'success'),
      error => console.log(error)
    );
  }

}
