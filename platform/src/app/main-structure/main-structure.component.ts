import { Component, OnInit } from '@angular/core';
import { WebsiteThemeService } from '../website-theme.service';
import {RouterModule} from '@angular/router';
import { RoomControlService } from 'app/services/room-control.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'app/services/auth.service';
import firebase from 'firebase/app'


@Component({
  selector: 'app-main-structure',
  templateUrl: './main-structure.component.html',
  styleUrls: ['./main-structure.component.scss']
})
export class MainStructureComponent implements OnInit {
  notifications: any;

  constructor(private theme_ser: WebsiteThemeService, private roomSRV: RoomControlService, 
    public authservice:AuthService) { 
      this.authservice.getAfmin(firebase.auth().currentUser?.uid)
    }

  alert ={
    type :"fire",
    room : "22" ,
    sector : "2",
  }


  theme = ''

  ngOnInit(): void {
    
    console.log(this.authservice.isAdmin);
    
    this.roomSRV.getListOfAlerts().snapshotChanges().pipe(map(changes => changes.map(c => 
      ({ key: c.payload.key,... c.payload.val()}) ))).subscribe(res => {
        this.notifications = res
      })

      
      this.authservice.getAfmin(firebase.auth().currentUser?.uid);
      this.authservice.getName(); 
      
  }

  switchTheme() {
    this.theme_ser.sendClickEvent();
  }
  notif_list=[1,1,,1,1,1,1,1,1,1,1,1,1,1,1]

  deletAllNotifications() {
    this.roomSRV.deleteAllAlerts();
  }

}
