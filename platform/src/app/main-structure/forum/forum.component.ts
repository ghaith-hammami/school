import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private postService: PostServicesService,
    activatedRoute: ActivatedRoute, private router: Router) {
    //to update the time (time ago)
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    //test 
    this.postService.getOrderedPosts().snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} })))).subscribe(res => {
        this.posts = res
        console.log(this.posts);
      })


    //this is simply to get the topics, if not for the topics , we can remove it and we 
    //can still get the posts list.
    this.postService.getPostsList()

    //to filter the options in the search box
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        this._filter(value)
      )
    )
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
  private _filter(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.topics.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }


  page: number = 1
  postlist = [1, 2, 3, 4, 5, 6, 79, 8798, 897, 98, 78, 88, 8, 5, 5, , 5, 5, , 55, , 55, 5, 5, 5, 5, 5, 55, 5, 5, 5, 5]
  list_length: any = this.postlist.length
  //go_to_post_form(){
  //this.router.navigate(['/forum_add_post'])
  //}
}
