import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss']
})
export class ForumDetailsComponent implements OnInit {

  constructor() { }

  showMe:boolean=false
  ngOnInit(){

  }
  toogleTag(){
    this.showMe=!this.showMe
  }
  sethide(element:any, text:any){
    element.textContent = text;
    element.disabled = true;
    element.disabled = false;
  }

}
