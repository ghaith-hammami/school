import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { RoomControlService } from 'app/services/room-control.service';
import { CheckBox } from '@syncfusion/ej2-angular-buttons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-control',
  templateUrl: './class-control.component.html',
  styleUrls: ['./class-control.component.scss']
})
export class ClassControlComponent implements OnInit {

  classrooms: any
  role: string = ""

  constructor(private roomService: RoomControlService, private activeRoute: ActivatedRoute) { }
  empty = 'not available'

  ngOnInit(): void {
    this.roomService.getRooms().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(res => {
        this.classrooms = res
      })

    this.activeRoute.params.subscribe(res => {
      this.role = res['role'];
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

