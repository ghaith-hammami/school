import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Classroom } from '../model/classroom';

@Injectable({
  providedIn: 'root'
})
export class RoomControlService {

  roomsPath = "/Rooms"
  roomsRef: AngularFireList<Classroom>
  constructor(public db: AngularFireDatabase) { 
    this.roomsRef = this.db.list(this.roomsPath)
  }

  getRooms() {
    return this.roomsRef;
  }

  changeRoomProperty(key: string, value: any): Promise<any> {
    return this.roomsRef.update(key, value);
  }
}
