import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: FileList, url: string) {

    const formData = new FormData();
    const arrayFiles = Array.from(files);

    arrayFiles.forEach(file => formData.append('file', file, file.name));

    // Criando uma request do zero
    const request = new HttpRequest('POST', url, formData);

    return this.http.request(request);

    // Poderia ter sido utilizado assim
    // return this.http.post(url, formData);
  }
}
