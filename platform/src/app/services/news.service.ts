import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { News } from '../model/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  path = '/News'
  NewsRef: AngularFireList<News>
  constructor(private db: AngularFireDatabase) {
    this.NewsRef = this.db.list(this.path)
  }
  //get the list of news
  getAllNews(): AngularFireList<News> {
    return this.NewsRef;
  }

  //add a new News
  CreatNews(news: News): any {
    return this.NewsRef.push(news)
  }
  //delete a News
  Update(key: string, value: any): Promise<any> {
    return this.NewsRef.remove(key)
  }

  //delete all the news
  DeleteAll(): Promise<any> {
    return this.NewsRef.remove()
  }
}

