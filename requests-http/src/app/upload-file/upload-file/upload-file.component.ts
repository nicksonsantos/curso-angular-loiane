import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { environment } from '../../../environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: FileList | null = {} as FileList;
  temArquivoUpado: boolean = false;
  activateProgressBar: boolean = false;
  valueProgressBar: number = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.files = target.files;
    this.temArquivoUpado = true;
    this.valueProgressBar = 0;
  }

  onUpload() {
    if (this.temArquivoUpado && this.files && this.files!.length > 0) {
      this.activateProgressBar = true;
      this.service.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress(progress => {
            // console.log(progress);
            this.valueProgressBar = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'));
        // .subscribe((event: HttpEvent<Object>) => {
        //   // console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     // console.log(event);
        //     console.log('Upload Concluido');
        //   }
        //   else if (event.type === HttpEventType.UploadProgress) {
        //     const total = event.total;
        //     if (total !== undefined) {
        //       this.valueProgressBar = Math.round(((event.loaded * 100) / total));
        //       // console.log('Progresso', this.valueProgressBar);
        //     }
        //   }
        // });
    }
  }

}
