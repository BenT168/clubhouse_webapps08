import { Injectable } from '@angular/core';

import { IUser } from '../shared/interfaces';

@Injectable()
export class TrackByService {

  user(index:number, user: IUser) {
    return user.id;
  }


}
