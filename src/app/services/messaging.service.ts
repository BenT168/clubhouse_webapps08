import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagingService {

  constructor(private http: Http) { }

  getAllMessagesByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/messaging/' + room)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveMessaging(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/messaging', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  showMessaging(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/api/messaging/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  updateMessaging(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/messaging/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteMessaging(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/api/messaging/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
