import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListSearchBarComponent } from './posts-list-search-bar.component';

describe('PostsListSearchBarComponent', () => {
  let component: PostsListSearchBarComponent;
  let fixture: ComponentFixture<PostsListSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsListSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
