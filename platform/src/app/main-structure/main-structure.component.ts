import { Component, OnInit } from '@angular/core';
import { WebsiteThemeService } from '../website-theme.service';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-main-structure',
  templateUrl: './main-structure.component.html',
  styleUrls: ['./main-structure.component.scss']
})
export class MainStructureComponent implements OnInit {

  constructor(private theme_ser: WebsiteThemeService) { }

  alert ={
    type :"fire",
    room : "22" ,
    sector : "2",
  }


  theme = ''

  ngOnInit(): void {
  }

  switchTheme() {
    this.theme_ser.sendClickEvent()
  }
  notif_list=[1,1,,1,1,1,1,1,1,1,1,1,1,1,1]

}
