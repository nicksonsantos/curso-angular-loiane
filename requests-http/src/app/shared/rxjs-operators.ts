import { filter, map, pipe, tap } from "rxjs";
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function filterResponse<T>() {
  return pipe(
    filter((event: any) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      const total = event.total;
      if (total !== undefined) {
        cb(Math.round(((event.loaded * 100) / total)));
      }
    }
  });
}
