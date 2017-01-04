import {Injectable} from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Pairing} from "../models/pairing";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class PairingsService {

  private URL: string;
  private _pairings: BehaviorSubject<Pairing[]>;
  private dataStore: {
    pairings: Pairing[]
  };
  private selected: Pairing[];
  private filterTerm: string;
  private limit: number;
  private skip: number;

  constructor(private http: Http) {
    this.URL = 'http://localhost:5000/pairings';
    //this.URL = 'https://gentle-cove-53116.herokuapp.com/matches'
    this.dataStore = { pairings: [] };
    this._pairings = <BehaviorSubject<Pairing[]>>new BehaviorSubject([]);

    this.filterTerm = '';
    this.limit = 100;
    this.skip = 0;
  }

  get pairings() {
    return this._pairings.asObservable();
  }

  requestPairings(selected: Pairing[], filterTerm = '') {
    this.selected = selected;
    this.filterTerm = filterTerm;
    this.skip = 0;
    this.dataStore.pairings = [];

    this.more();
  }

  setPageLimit(limit: number) {
    this.limit = limit;
  }

  setFilter(filterTerm: string) {
    this.filterTerm = filterTerm;
    this.skip = 0;
    this.dataStore.pairings = [];

    this.more()
  }

  next() {
    let params: URLSearchParams = new URLSearchParams();
    params.append('filter', this.filterTerm);
    params.append('skip', this.skip.toString());
    params.append('limit', this.limit.toString());
    for (let select of this.selected) {
      params.append('ingredient', select.name);
    }
    this.http.get(this.URL, { search: params }).map(response => response.json()).subscribe(data => {
      this.dataStore.pairings.concat(data)
      this._pairings.next(data);
      this.skip += this.limit;
    }, this.handleError);
  }

  more() {
    let params: URLSearchParams = new URLSearchParams();
    params.append('filter', this.filterTerm);
    params.append('skip', this.skip.toString());
    params.append('limit', this.limit.toString());
    for (let select of this.selected) {
      params.append('ingredient', select.name);
    }
    this.http.get(this.URL, { search: params }).map(response => response.json()).subscribe(data => {
      this.dataStore.pairings = this.dataStore.pairings.concat(data);
      this._pairings.next(this.dataStore.pairings);
      this.skip += this.limit;
    }, this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error);
  }

}
