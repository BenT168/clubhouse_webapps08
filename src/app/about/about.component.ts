import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { IUser } from '../shared/interfaces';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  users: Observable<IUser[]>;
  private searchTerms = new Subject<string>();
  selectedUser = {};

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private router: Router,
              private userService: UserService) { }

  ngOnInit():void{}

  onSelect(user): void {
    this.selectedUser = user;
  }

}
