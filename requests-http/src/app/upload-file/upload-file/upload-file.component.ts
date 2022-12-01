import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: FileList = new FileList;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);
    this.files = event.target.files;
  }

  onUpload() {

  }

}
