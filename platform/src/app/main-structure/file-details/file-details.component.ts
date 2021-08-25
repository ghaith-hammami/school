import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'app/model/file-upload.model';
import { UploadFileService } from 'app/services/upload-file.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}

