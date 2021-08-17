import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsiteThemeService } from './website-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platform';

  clickEventSubscription:Subscription
  
  
  constructor(@Inject(DOCUMENT) private document:Document, private renderer:Renderer2 ,private theme_ser:WebsiteThemeService) {
    this.clickEventSubscription =this.theme_ser.getClickEvent().subscribe(()=>{
      this.switchTheme()
    })
   }

   


  theme='light-theme'

  InitializeTheme=() => this.renderer.addClass(this.document.body,this.theme)
  ngOnInit(): void {
    this.InitializeTheme()
  }
  switchTheme(){
    this.document.body.classList.replace(this.theme,this.theme ==='light-theme'? (this.theme ='dark-theme') : (this.theme='light-theme'))
  }
}
