import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Building} from "../pages/buildings/building/domain/building-info";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class BuildingsInfoService {
  private infoUrl = 'assets/properties/buildings-data.json';

  constructor(private http: Http) {
  }

  getAllBuildingsInfo(): Observable<Building[]> {
    return this.http.get(this.infoUrl)
                    .map(response => JSON.parse(response.text()).data.sort(this.sortByName) as Building[])
                    .catch(this.handleError);
  }

  sortByName(currentName, nextName) {
    return currentName['name'].localeCompare(nextName['name']);
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
