import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
 
  constructor( private router:Router) { }

  ngOnInit(): void {
    
  }
  go_to_login(){
    this.router.navigate(['/login'])
  }
  scroll(el:HTMLElement){
    el.scrollIntoView()
  }

  go_to_crew(crew:HTMLElement){
    crew.scrollIntoView()
  }
  


  
}

