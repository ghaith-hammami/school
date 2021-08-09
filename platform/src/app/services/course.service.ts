import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { map } from "rxjs/operators"
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  path = "/courses"
  courseRef!: AngularFireList<Course>
  courses: any;
  

  subjects = [
    "Mathematics",
    "Science",
    "Physics",
    "Geography",
    "French"
  ]

  constructor(public db: AngularFireDatabase) {
    this.courseRef = this.db.list(this.path)
  }

  //get the list of courses
  getCourses(): AngularFireList<Course> {
    return this.courseRef;
  }

  getAllCourses() {
    this.getCourses().snapshotChanges().pipe(map((changes: any) => changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((rs: any) => {
        console.log(rs);
        this.courses = rs
      })
  }

  //Add a course 
  createCourse(course: Course): any {
    return this.courseRef.push(course);
  }

  //update a course
  updateCourse(key: string, value: any): Promise<any> {
    return this.courseRef.update(key, value);
  }

  //download file with courses
  
}
