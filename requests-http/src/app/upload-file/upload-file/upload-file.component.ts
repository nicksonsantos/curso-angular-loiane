import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: FileList | null = {} as FileList;
  temArquivoUpado: boolean = false;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.files = target.files;
    this.temArquivoUpado = true;
  }

  onUpload() {
    if (this.temArquivoUpado && this.files && this.files!.length > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/api/upload')
        .subscribe(response => console.log('Upload Concluido'));
    }
  }

}
