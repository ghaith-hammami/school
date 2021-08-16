
import { Component, OnInit, } from '@angular/core';
import { WebsiteThemeService } from '../website-theme.service';

@Component({
  selector: 'app-main-structure',
  templateUrl: './main-structure.component.html',
  styleUrls: ['./main-structure.component.scss']
})
export class MainStructureComponent implements OnInit {
  
  constructor(private theme_ser:WebsiteThemeService) { }

  theme =''

  ngOnInit(): void {
   
  }

  switchTheme(){
   this.theme_ser.sendClickEvent()
  }
  
}

