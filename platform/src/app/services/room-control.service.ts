import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from 'app/model/alert';
import { map } from 'rxjs/operators';
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
  noisePath = "/tooMuchNoise"
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

  addFireAlert() {
    this.db.database.ref(this.firePath).on("child_changed", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val() === false) {
        this.getRoomNumber(snapshot.key).snapshotChanges().pipe(map(changes =>
          changes.map(c => ({ key: c.payload.key, val: c.payload.val() as { "classroomNumber": number } })))).subscribe(rs => {
            if (rs) {
              this.alert.title = "Fire in classroom number " + rs[0].val.classroomNumber;
              this.alert.body = "There have been a detection of fire in classroom number " + rs[0].val.classroomNumber;
              this.alert.date = Date.now()
              this.alertsRef.push(this.alert);
            }
          })
      }

    })
  }


  addNoiseAlert() {
    this.db.database.ref(this.noisePath).on("child_changed", (snapshot) => {
      if (snapshot.val() === true) {
        this.getRoomNumber(snapshot.key).snapshotChanges().pipe(map(changes =>
          changes.map(c => ({ key: c.payload.key, val: c.payload.val() as { "classroomNumber": number } })))).subscribe(rs => {
            if (rs) {
              this.alert.title = "Too much noise in classroom number " + rs[0].val.classroomNumber;
              this.alert.body = "The intenisty of sound is too high in classroom number " + rs[0].val.classroomNumber;
              this.alert.date = Date.now()
              this.alertsRef.push(this.alert);
            }
          })
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

  getRoomNumber(key: any) {
    return this.db.list(this.roomsPath, ref => ref.orderByKey().equalTo(key));
  }

  deleteAllAlerts(): Promise<any> {
    return this.alertsRef.remove();
  }

}



