import { Component, OnInit } from '@angular/core';
import { RoomControlService } from 'app/services/room-control.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  noise: any;
  message: any
  constructor(private classService: RoomControlService) { }

  ngOnInit(): void {
    /* this.classService.getRooms().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(res => {
        console.log(res);
      }) */

/*     //alerts
    this.alertsService.requestPermission();
    this.alertsService.receiveMessage();
    this.message = this.alertsService.currentMessage; */

  }



}
