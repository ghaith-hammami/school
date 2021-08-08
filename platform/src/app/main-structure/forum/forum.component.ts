import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  page :number =1
  postlist=[1,2,3,4,5,6,79,8798,897,98,78,88,8,5,5,,5,5,,55,,55,5,5,5,5,5,55,5,5,5,5]
  list_length:any =this.postlist.length
  //go_to_post_form(){
    //this.router.navigate(['/forum_add_post'])
  //}
}
