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
   news =[{
    text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    type : "absence",
    attachement_URL :"",
    day : "09",
    month : "may"
  },
  {
    text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    type : "event",
    attachement_URL :"https://github.com",
    day : "25",
    month : "apr"
  },
  {
    text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
    type : "i dont know ",
    attachement_URL :"",
    day : "30",
    month : "fev"
  },
  {
    text : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.ajic jeirt ls,cjeua doiu oeijf oasn plja",
    type : "absence; orent ",
    attachement_URL :"",
    day : "11",
    month : "apr"
  }]
  

}
