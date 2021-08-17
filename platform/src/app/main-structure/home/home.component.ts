import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //classes logic
  classes=[
    {sector:"1", id:"05"},
    {sector:"1", id:"08"},
    {sector:"1", id:"09"},
    {sector:"2", id:"15"},
    {sector:"2", id:"18"},
  ];
   length = this.classes.length

   //news
  news =[1,2,3,4,5,6,7,8,9]
  
  scroll(el:HTMLElement){
    console.log(el)
  }


}
