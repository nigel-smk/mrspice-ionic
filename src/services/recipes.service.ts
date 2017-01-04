import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import { Observable } from 'rxjs/Observable';
import {Recipe} from "../models/recipe";
import {Pairing} from "../models/pairing";

@Injectable()
export class RecipesService {

  private URL: string;
  private _recipes: BehaviorSubject<Recipe[]>;
  private dataStore : {
    recipes: Recipe[]
  };

  private selected: Pairing[];
  private skip: number;
  private limit: number;

  constructor(public http: Http) {
    this.URL = 'http://localhost:5000/recipes';
    this.dataStore = { recipes: [] }
    this._recipes = <BehaviorSubject<Recipe[]>>new BehaviorSubject([]);

    this.selected = [];
    this.skip = 0;
    this.limit = 20;
  }

  get recipes() {
    return this._recipes.asObservable();
  }

  requestRecipes(selected: Pairing[]) {
    this.selected = selected;
    this.skip = 0;
    this.dataStore.recipes = [];

    this.more();
  }

  more() {
    let params: URLSearchParams = new URLSearchParams();
    params.append('skip', this.skip.toString());
    params.append('limit', this.limit.toString());
    for (let select of this.selected) {
      params.append('ingredient', select.name);
    }

    this.http.get(this.URL, { search: params }).map(response => response.json()).subscribe(data => {
      this.dataStore.recipes = this.dataStore.recipes.concat(data);
      console.log(data);
      this._recipes.next(this.dataStore.recipes);
      this.skip += this.limit;
    }, this.handleError);
  }

  setPageLimit(limit: number) {
    this.limit = limit;
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error);
  }

}
