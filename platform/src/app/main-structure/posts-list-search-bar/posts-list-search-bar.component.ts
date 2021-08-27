import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostServicesService } from 'app/services/post-services.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-posts-list-search-bar',
  templateUrl: './posts-list-search-bar.component.html',
  styleUrls: ['./posts-list-search-bar.component.scss']
})
export class PostsListSearchBarComponent implements OnInit {
  @Output() sendQuery: EventEmitter<any> = new EventEmitter<any>()

  public query: any;
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  //get the list of topics from the service
  topics = this.postService.topics;

  constructor(private postService: PostServicesService) { }

  ngOnInit(): void {



    //this is simply to get the topics, if not for the topics , we can remove it and we 
    //can still get the posts list.
    this.postService.getPostsList()
    //to filter the options in the search box
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value =>
        
        this._filter(value))
        
    )

  }

  /* display the topics in the search box */
  displayFn(subject: any) {
    return subject ? subject : undefined;
  }

  /* filter the topics based on your input */
  private _filter(value: string): string[] {
    this.sendQuery.emit(value);
    const filterValue = value.toLowerCase();
    return this.topics.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

}