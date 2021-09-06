import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'app/services/news.service';
import { News } from 'app/model/News';
import { map } from 'rxjs/operators';
import { AuthService } from 'app/services/auth.service';
import firebase from 'firebase/app'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AddNews:FormGroup;
  news= new News();
  submitted= false;
  News: any;

  constructor(private  newsService:NewsService, public authSRV: AuthService) { 
    this.AddNews = new FormGroup({
      "newsHeadline": new FormControl(null,[Validators.required]),
      "newsText": new FormControl(null,[Validators.required]),
      "newsDateOfPublishement": new FormControl(null,[Validators.required]),
      })
  }

  ngOnInit(): void {
    this.getAllNews();
    this.authSRV.getAfmin(firebase.auth().currentUser?.uid);

  }
  getAllNews() {
    this.newsService.getAllNews().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))).subscribe(rs => {
      this.News = rs;
      return this.News;
    })
  }
  classes=[
    {sector:"1", id:"05"},
    {sector:"1", id:"08"},
    {sector:"1", id:"09"},
    {sector:"2", id:"15"},
    {sector:"2", id:"18"},
  ];
   length = this.classes.length

   //news
  
  scroll(el:HTMLElement){
    console.log(el)
  }
  
  onSubmit(){
    this.submitted=true;
    this.news.newsHeadline = this.AddNews.value.newsHeadline;
    this.news.newsText = this.AddNews.value.newsText;
    this.newsService.CreatNews(this.news)
  }
  newNews(){
    this.submitted=false;
    this.AddNews.reset();
  }
  //classes logic
  


}
