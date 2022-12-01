import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

export class CrudService<T extends { id?: number }> {

  constructor(protected http: HttpClient, private API_URL: string) { }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(500)
      );
  }

  getById(id: number) {
    return this.http.get<T>(`${this.API_URL}${id}`);
  }

  create(record: T): Observable<T> {

    return this.http.post<T>(this.API_URL, record);
  }

  update(record: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}${record.id}`, record);
  }

  delete(id: number) {
    const url = `${this.API_URL}${id}`;
    return this.http.delete(url);
  }

  save(record: T) {
    if (record.id) {
      return this.update(record);
    }

    return this.create(record);
  }
}
