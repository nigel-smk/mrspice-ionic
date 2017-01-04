import {Injectable} from "@angular/core";
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import {Pairing} from "../models/pairing";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class PairingsService {

  private URL: string;
  private _pairings: BehaviorSubject<Pairing[]>;
  private dataStore: {
    pairings: Pairing[]
  };
  private limit: number;
  private skip: number;
  private filterTerm: string;

  constructor(private http: Http) {
    this.URL = 'http://localhost:5000/pairings';
    //this.URL = 'https://gentle-cove-53116.herokuapp.com/matches'
    this.dataStore = { pairings: [] };
    this._pairings = <BehaviorSubject<Pairing[]>>new BehaviorSubject([]);

    this.filterTerm = '';
    this.limit = 20;
    this.skip = 0;
  }

  get pairings() {
    return this._pairings.asObservable();
  }

  requestPairings(pairings: Pairing[]) {
    let params: URLSearchParams = new URLSearchParams();
    this.skip = 0;
    for (let pairing of pairings) {
      params.append('ingredient', pairing.name);
    }
    this.http.get(this.URL, { search: params }).map(response => response.json()).subscribe(data => {
      this.dataStore.pairings = data;
      this.more();
    }, this.handleError);
  }

  setPageLimit(limit: number) {
    this.limit = limit;
  }

  setFilter(filterTerm: string) {
    this.filterTerm = filterTerm;
    this.skip = 0;
    this.more()
  }

  next() {
    //TODO sort filtered results by levenstein distance?
    this._pairings.next(this.dataStore.pairings.filter((pairing: Pairing) => {
      //filter for those that contain the filter string
      return pairing.name.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1;
    }).slice(this.skip, this.skip + this.limit));
    this.skip += this.limit;
  }

  more() {
    //like next() but returns all previously requested pages as well
    this._pairings.next(this.dataStore.pairings.filter((pairing: Pairing) => {
      //filter for those that contain the filter string
      return pairing.name.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1;
    }).slice(0, this.skip + this.limit));
    this.skip += this.limit;
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error);
  }

}
