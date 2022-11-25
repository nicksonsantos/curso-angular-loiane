import { Component } from '@angular/core';
import { Config } from '../shared/models/config';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  config: Config | undefined;

  constructor(private configService: ConfigService) { }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data) => this.config = {
        cursosUrl: (data as any).cursosUrl,
        textfile: (data as any).textfile
      });
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }

}
