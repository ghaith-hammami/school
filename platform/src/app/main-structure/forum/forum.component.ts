import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'app/model/Post';
import { PostServicesService } from 'app/services/post-services.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public search: any = '';
  public query: any;
  public time = new Date()
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  //get the list of posts from the service
  posts: any

  //get the list of topics from the service
  topics = this.postService.topics;

  //add new post logic
  AddPost: FormGroup;
  post = new Post();
  submitted = false;
  date = new Date();
  pipe = new DatePipe('en-US')

  constructor(private postService: PostServicesService,
    activatedRoute: ActivatedRoute, private router: Router) {
    //add new post formGroup
    this.AddPost = new FormGroup({
      "PostHeadline": new FormControl(null, [Validators.required]),
      "PostText": new FormControl(null, [Validators.required]),
      "Author": new FormControl(null, [Validators.required]),
      "Topic": new FormControl(null, [Validators.required]),
    })
    //to update the time (time ago)
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnInit(): void {

    //to filter the options in the search box
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        this._filter(value))
    )


    //test 
    this.postService.getOrderedPosts().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} })))).subscribe(res => {
        this.posts = res
      })


    //this is simply to get the topics, if not for the topics , we can remove it and we 
    //can still get the posts list.
    this.postService.getPostsList()

  }

  onSubmit() {
    this.submitted = true;
    this.post.PostHeadline = this.AddPost.value.PostHeadline;
    this.post.PostText = this.AddPost.value.PostText;
    this.post.Author = this.AddPost.value.Author;
    this.post.Topic = this.AddPost.value.Topic;
    this.post.Created = this.pipe.transform(Date(), 'yyyy-dd-MM HH:mm:ss');
    this.post.dateNow = Date.now();
    this.post.negativeTimestamp = - this.post.dateNow;
    this.post.numberOFComments = 0
    this.postService.CreatePost(this.post);
    this.AddPost.reset();
  }

  // Get the key 
  getKey(key: string) {
    this.router.navigate(['platform/forum', key]);
  }

  /* display the topics in the search box */

  displayFn(subject: any) {
    return subject ? subject : undefined;
  }


  /* filter the topics based on your input */
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.topics.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getQuery(event: any) {
    this.query = event
  }
  /* there is an error that is being thrown, and that is because we get the query from the search 
  bar component, and query is used in the template */
  page: number = 1
 
}
