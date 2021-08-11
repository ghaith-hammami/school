import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-structure',
  templateUrl: './main-structure.component.html',
  styleUrls: ['./main-structure.component.scss']
})
export class MainStructureComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit(): void {console.log(this.authservice.isLogedin)
  }

}
