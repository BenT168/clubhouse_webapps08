import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { SorterService } from '../services/sorter.service';
import { TrackByService } from '../services/trackby.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  event = {};
  events = [];
  isLoading = true;
  isEditing = false;


  addEventForm: FormGroup;
  name = this.auth.currentUser.username;
  organisation = this.auth.currentUser.organisation;
  task = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);

  constructor(private eventService: EventService,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent,
              private sorterService: SorterService,
              public trackbyService: TrackByService) { }

  currentUser = this.auth.currentUser.username;

  ngOnInit() {
    this.getEvents();
    this.addEventForm = this.formBuilder.group({
      name: this.name,
      organisation: this.organisation,
      date: this.date,
      location: this.location,
      task: this.task
    });
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
      data => this.events = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addEvent() {
    this.eventService.addEvent(this.addEventForm.value).subscribe(
      res => {
        const newEvent = res.json();
        this.events.push(newEvent);
        this.addEventForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(event) {
  this.event = event;
  if(event.organisation === this.auth.currentUser.organisation) {
    this.isEditing = true;
  } else {
    this.isEditing = false;
  }
  }

  cancelEditing() {
    this.isEditing = false;
    this.event = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the events to reset the editing
    this.getEvents();
  }

  editEvent(event) {
    this.eventService.editEvent(event).subscribe(
      res => {
        this.isEditing = false;
        this.event = event;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteEvent(event) {
    if(event.organisation === this.auth.currentUser.organisation) {
      if (window.confirm('Are you sure you want to permanently delete this item?')) {
        this.eventService.deleteEvent(event).subscribe(
          res => {
            const pos = this.events.map(elem => elem._id).indexOf(event._id);
            this.events.splice(pos, 1);
            this.toast.setMessage('item deleted successfully.', 'success');
          },
          error => console.log(error)
        );
      }
    }
  }

  sort(prop: string) {
      this.sorterService.sort(this.events, prop);
  }

}
