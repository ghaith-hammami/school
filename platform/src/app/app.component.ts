import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomControlService } from './services/room-control.service';
import { WebsiteThemeService } from './website-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platform';
  message: any
  clickEventSubscription: Subscription


  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private theme_ser: WebsiteThemeService,
    private roomSRV: RoomControlService) {
    this.clickEventSubscription = this.theme_ser.getClickEvent().subscribe(() => {
      this.switchTheme()
    })
  }




  theme = 'light-theme'

  InitializeTheme = () => this.renderer.addClass(this.document.body, this.theme)
  ngOnInit(): void {

    
    this.InitializeTheme();
    //alerts 
    this.roomSRV.addFireAlert();
    this.roomSRV.addNoiseAlert()
    this.roomSRV.newAlertMessage();

  }
  switchTheme() {
    this.document.body.classList.replace(this.theme, this.theme === 'light-theme' ? (this.theme = 'dark-theme') : (this.theme = 'light-theme'))
  }
}
