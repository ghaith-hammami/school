import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'app/services/upload-file.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-course-files',
  templateUrl: './course-files.component.html',
  styleUrls: ['./course-files.component.scss']
})
export class CourseFilesComponent implements OnInit {
  @Input() files: any;
  @Input() course: any;
  courseFiles!: any


  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
          
    this.uploadService.getCourseFiles(this.course.key).valueChanges().subscribe(res => {
      this.courseFiles = res;
    })
  
}
}