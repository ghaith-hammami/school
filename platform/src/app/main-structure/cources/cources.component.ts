import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'app/model/course';
import { FileUpload } from 'app/model/file-upload.model';
import { CourseService } from 'app/services/course.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cources',
  templateUrl: './cources.component.html',
  styleUrls: ['./cources.component.scss']
})
export class CourcesComponent implements OnInit {
  course = new Course();
  addCourse!: FormGroup;
  submitted = true;
  add = false;
  subjects: any;
  updatedFile: any;

  constructor(private courseServices: CourseService,
    private uploadService: UploadFileService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.addCourse = new FormGroup({
      "courseTitle": new FormControl(null, [Validators.required]),
      "courseSubject": new FormControl(null, [Validators.required])
    })
  }

  onSubmit(formDirective: any) {
    this.course.Title = this.addCourse.value.courseTitle;
    if (this.addCourse.value.courseSubject !== null) {
      this.course.Subject = this.addCourse.value.courseSubject.toLowerCase();
    }
    this.courseServices.createCourse(this.course).then((res: any) => {
      //we need the course key to add it to the uploaded file object in the firebase
      //so we actually can have a link between the course and its attached files. 
      this.newCourseKey = res.key;
      console.log(this.FilesAttached);
      for (let file of this.FilesAttached) {
        this.uploadService.UpdateTheFile(file.key, { "courseKey": this.newCourseKey });
        this.uploadService.UpdateTheFile(file.key, { "added": true });
        //we are getting the updated file (by updated I mean the same file but with added
        // = true and courseKey = to the current added course key), because when we tried 
        // to add this same file here without calling this method , it added the older
        // file (proprities not updated), that is why we created this service in the first place
        this.uploadService.getFilewithKey(file.key).valueChanges().subscribe(res => {
          this.updatedFile = res;
          this.uploadService.AddFilesToCoursesNode(this.newCourseKey, this.updatedFile);

        });
      }
    })
    this.submitted = false;
    this.addCourse.reset();
    formDirective.resetForm();
  }

  ngOnInit(): void {
    //display the courses' list logic
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      const subject = params['subject']
      this.displayedSubject = params['subject']
      if (subject === this.allCourses) {
        this.courseServices.getCourses().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
          .subscribe(rs => {
            this.courses = rs;
          })
      } else {
        const query = this.db.list('courses', ref => ref.orderByChild('Subject').equalTo(subject))
        query.snapshotChanges().pipe(map(changes => changes.map((c: any) =>
          ({ key: c.payload.key, ...c.payload.val() as {} })))).subscribe(res => {
            this.courses = res;
          })
      }
    })

    //get the list of subjects 
    this.courseServices.getSubjectsList().valueChanges().subscribe(res => {
      this.subjects = res;
    })

  }


  //upload file
  selectedFiles!: any;
  currentFileUpload!: FileUpload;
  percentage!: number;
  FilesAttached: any;
  newCourseKey: any;


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  FilesAttachedToCourse(event: any) {
    this.FilesAttached = event;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage: number) => {
        this.percentage = Math.round(percentage);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  //get the courses list logic
  files: Array<any> = []
  //this is to help us style the selected subject button
  displayedSubject = undefined;
  //courses depends on the the selected subject, that's why we are using if
  courses: any;

  db = this.courseServices.db
  //when we want to show all courses
  allCourses: string = "all"

  //redirect to courses in that subject
  selectSubject(s: string) {
    this.router.navigate(['platform/courses', s.toLowerCase()])
  }

  // change the button (subject selected) styling
  changeStyling(s: any) {
    this.displayedSubject = s;
  }




  page = 1

}
