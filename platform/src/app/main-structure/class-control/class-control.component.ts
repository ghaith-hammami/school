import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { RoomControlService } from 'app/services/room-control.service';
import { CheckBox } from '@syncfusion/ej2-angular-buttons';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import firebase from 'firebase/app'


@Component({
  selector: 'app-class-control',
  templateUrl: './class-control.component.html',
  styleUrls: ['./class-control.component.scss']
})
export class ClassControlComponent implements OnInit {

  classrooms: any

  constructor(private roomService: RoomControlService, private activeRoute: ActivatedRoute,
    public authSRV: AuthService) { }
  empty = 'not available'

  ngOnInit(): void {

    //
    this.authSRV.getAfmin(firebase.auth().currentUser?.uid);
    //
    this.roomService.getRooms().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(res => {
        this.classrooms = res
      })


  }

  airConditionner(index: number, airConditionnerStatus: boolean) {
    this.roomService.changeRoomProperty(this.classrooms[index].key, { "airConditionner": !airConditionnerStatus })
  }

  fireSystem(index: number, fireSystemStatus: boolean) {
    this.roomService.changeRoomProperty(this.classrooms[index].key, { "fireSystem": !fireSystemStatus })
  }

  antiTheft(index: number, antiTheftStatus: boolean) {
    this.roomService.changeRoomProperty(this.classrooms[index].key, { "antiTheft": !antiTheftStatus })
  }

  lighting(index: number, lightingStatus: boolean) {
    this.roomService.changeRoomProperty(this.classrooms[index].key, { "lighting": !lightingStatus })
  }


}

