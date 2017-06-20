import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MessagingService } from '../services/messaging.service';
import { AuthService } from '../services/auth.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messagings: any = [];
  rooms: any = [];
  joined: boolean = false;
  newUser = { nickname: '', room: '' };
  newRoom = { name: '', organisation: '' };
  msgData = { room: '', nickname: '', message: '' };
  roomData = { name: '', organisation: '' };
  socket = io('/api/');

  constructor(private messagingService: MessagingService,
              private auth: AuthService) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    var room = JSON.parse(localStorage.getItem("room"));
    if(user!==null) {
      this.getAllMessagesByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joined = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
        this.messagings.push(data.message);
        this.msgData = { room: user.room, nickname: user.nickname, message: '' }
        this.scrollToBottom();
      }
    }.bind(this));
    // Get all messages in current room at periodic intervals and update list.
    var intervalID = setInterval(this.getAllMessagesByRoom(room), 1000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  // Note: Bad side effects (i.e: not strictly a get; it updates 'messagings')
  getAllMessagesByRoom(room) {
    this.messagingService.getAllMessagesByRoom(room).then((res) => {
      this.messagings = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getAllMessagesByRoom(this.newUser.room);
    this.newUser.nickname = this.auth.currentUser.username;
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joined = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  addRoom() {
    localStorage.setItem("room", JSON.stringify(this.newRoom));
    this.newRoom.organisation = this.auth.currentUser.organisation;
    this.roomData = { name: this.newRoom.name, organisation: this.newRoom.organisation};
    this.rooms.push(this.roomData);
  }

  sendMessage() {
    this.messagingService.saveMessaging(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
      this.messagings.push(result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joined = false;
  }

}
