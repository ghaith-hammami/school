import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostServicesService } from 'app/services/post-services.service';
import { map } from 'rxjs/operators';
import { Comment } from "app/model/Comment"
import { AuthService } from 'app/services/auth.service';
import firebase from 'firebase/app'

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss']
})
export class ForumDetailsComponent implements OnInit {

  certainPost!: any;
  //comment formgroup and details
  db = this.postServices.db
  commentsPath: any
  AddComment!: FormGroup;
  comment = new Comment();
  date = new Date()
  postKey!: string
  comments: any


  constructor(
    private activatedRoute: ActivatedRoute,
    private postServices: PostServicesService, private authServ: AuthService
  ) {
    this.AddComment = new FormGroup({
      "commentContent": new FormControl(null, [Validators.required]),
      "commentAuthor": new FormControl(null)
    })
  }


  //onCommentSubmit: when submitting the comment
  onCommentSubmit(formDirective: any) {
    this.comment.commentContent = this.AddComment.value.commentContent
    this.comment.user = this.AddComment.value.commentAuthor
    this.comment.postKey = this.postKey;
    this.comment.commentedAt = new Date();
    this.comment.userUID = firebase.auth().currentUser?.uid;
    const commentsNumber = (this.certainPost.numberOFComments) + 1
    this.postServices.AddComment(this.comment);
    this.postServices.PostRef.update(this.postKey, { numberOFComments: commentsNumber });
    this.AddComment.reset();
    formDirective.resetForm();

  }

  //set the color of the form
  get controlColor() {
    return this.AddComment.invalid ? 'primary': 'primary';
  }
  




  //to Get the key of the post
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.postKey = params['key']
        this.postServices.getPostByURL(params["key"]).valueChanges().subscribe((rs) => {
          this.certainPost = rs
        })
      }
    )


    //get the comments of this post (certainPost) with the post key
    this.commentsPath = this.postServices.commentsPath;
    const certainPostComments = this.db.list(this.commentsPath, ref =>
      ref.orderByChild('postKey').equalTo(this.postKey))
    certainPostComments.snapshotChanges().pipe(map(changes => 
      changes.map(c => ({key: c.payload.key, ... c.payload.val() as {}})))).subscribe(rs => {
        this.comments = rs;
        console.log(this.comments);
        
      })

      
    

  }


  showMe:boolean=false
 
  toogleTag(){
    this.showMe=!this.showMe
  }
  sethide(element:any, text:any){
    element.textContent = text;
    element.disabled = true;
    element.disabled = false;
  }

}
