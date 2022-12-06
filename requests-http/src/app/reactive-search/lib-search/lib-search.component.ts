import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl('');
  total: number = 0;
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> = new Observable;
  readonly FIELDS = 'name,version';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
      .pipe(
          map((value: any) => value?.trim()),
          filter((value: string) => value.length > 1),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap((value: string) => this.http.get(this.SEARCH_URL, {
            params: {
              search: value,
              fields: this.FIELDS
            }
          })),
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
          // tap((value: string) => console.log(value)),
      );
  }

  onSearch() {
    const fields = 'name,version';
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.results$ = this.http.get(this.SEARCH_URL, {params})
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }
  }

}
