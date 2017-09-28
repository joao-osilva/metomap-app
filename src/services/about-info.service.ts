import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AppCreators} from "../pages/about/domain/app-creators";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {SocialMedias} from "../pages/about/domain/social-medias";

@Injectable()
export class AboutInfoService {
  private appCreatorsUrl = 'assets/properties/about-appcreators-data.json';
  private socialMediasUrl = 'assets/properties/about-socialmedias-data.json';

  constructor(private http: Http) {
  }

  getAppCreatorsInfo(): Observable<AppCreators[]> {
    return this.http.get(this.appCreatorsUrl)
                    .map(response => JSON.parse(response.text()).data as AppCreators[])
                    .catch(this.handleError);
  }

  getSocialMediasInfo(): Observable<SocialMedias[]> {
    return this.http.get(this.socialMediasUrl)
                    .map(response => JSON.parse(response.text()).data as SocialMedias[])
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
