import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Course } from '../model/course';
import { map } from "rxjs/operators"
import { Subject } from 'app/model/subject';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  path = "/courses"
  courseRef!: AngularFireList<Course>
  courses: any;
  subjectsPath = "/subjects"
  subjectsRef: AngularFireList<Subject>
  

  subjects = [
    "Mathematics",
    "Science",
    "Physics",
    "Geography",
    "French"
  ]

  constructor(public db: AngularFireDatabase) {
    this.courseRef = this.db.list(this.path);
    this.subjectsRef = this.db.list(this.subjectsPath);
  }

  //get the list of courses
  getCourses(): AngularFireList<Course> {
    return this.courseRef;
  }

  getAllCourses() {
    this.getCourses().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(rs => {
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

  getSubjectsList(): AngularFireList<Subject> {
    return this.subjectsRef
  }  
}
