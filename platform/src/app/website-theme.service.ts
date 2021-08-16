import { Injectable } from '@angular/core';
import { Subject ,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteThemeService {

  private subject =new Subject<any>()

  sendClickEvent(){
    this.subject.next()
  }
  getClickEvent() :Observable<any>{
    return this.subject.asObservable()
  }
 
 

}
