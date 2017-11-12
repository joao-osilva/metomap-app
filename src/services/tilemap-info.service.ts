import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class TilemapInfoService {
  private tilemapUrl = 'assets/properties/tilemap-data.json';

  constructor(private http: Http) {
  }

  getTilemapInfo(): Observable<number[]> {
    return this.http.get(this.tilemapUrl)
      .map(response => JSON.parse(response.text()).data as number[])
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
