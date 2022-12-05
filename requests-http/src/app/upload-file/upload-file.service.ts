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
    // const request = new HttpRequest('POST', url, formData);

    // return this.http.request(request);


    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      // o backend precisa setar o content-lenght para funcionar o reportProgress
      // reportProgress: true
    });
  }

  handleFile(res: any, fileName?: string) {
    const file = new Blob([res], {
      type: res.type
    });

    // IE
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    fileName? link.download = fileName : null;

    // funciona no chrome mas nao no firefox
    // link.click();
    // para funcionar no firefox fazer:
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => { // firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
