import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../shared/models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos/`;

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(500)
      );
  }

  getById(id: number) {
    return this.http.get<Curso>(`${this.API}${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(curso: Curso): Observable<Curso> {

    return this.http.post<Curso>(this.API, curso)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.API}${curso.id}`, curso);
  }

  delete(id: number) {
    const url = `${this.API}${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso);
    }

    return this.create(curso);
  }

}

