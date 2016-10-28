import {Injectable} from "@angular/core";
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable'


@Injectable()
export class QueryService {

  //private URL = 'http://localhost:5000/matches'
  private URL = 'https://gentle-cove-53116.herokuapp.com/matches'

  constructor(private http: Http) { }

  getPairings(ingredients: string[]): Observable<any[]> {
    //make http call and return json
    let params: URLSearchParams = new URLSearchParams();
    for (let ingredient of ingredients) {
      params.set('ingredient', ingredient);
    }

    return this.http.get(this.URL, { search: params })
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :43
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
