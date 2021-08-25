import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from 'app/model/alert';
import { Classroom } from '../model/classroom';

@Injectable({
  providedIn: 'root'
})
export class RoomControlService {

  alert = new Alert();
  initial: boolean = false;
  action: string = "I am taking immediate action";

  roomsPath = "/Rooms"
  firePath = "/FireSystemIsSafe"
  alertsPath = "/Alerts"

  roomsRef: AngularFireList<Classroom>
  alertsRef: AngularFireList<Alert>

  constructor(public db: AngularFireDatabase, private snackBar: MatSnackBar) {
    this.roomsRef = this.db.list(this.roomsPath);
    this.alertsRef = this.db.list(this.alertsPath);
  
  }

  getRooms() {
    return this.roomsRef;
  }

  changeRoomProperty(key: string, value: any): Promise<any> {
    return this.roomsRef.update(key, value);
  }

  addAlert() {
    this.db.database.ref(this.firePath).on("child_changed", (snapshot) => {
      if (snapshot.val() === true) {
        this.alert.title = "Fire in " + snapshot.key;
        this.alert.body = "There have been a detection of fire in " + snapshot.key;
        this.alert.date = Date.now()
        this.alertsRef.push(this.alert);
      }

    })
  }

  newAlertMessage() {
    this.db.database.ref(this.alertsPath).once("value", snap => {
      this.initial = true;
    })
    this.db.database.ref(this.alertsPath).on("child_added", (snap) => {
      if (!this.initial) return;
      this.snackBar.open(snap.val().body, this.action);
    })

  }

  getListOfAlerts(): AngularFireList<Alert> {
    return this.alertsRef;
  }
}
