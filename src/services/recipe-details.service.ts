import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import { Observable } from 'rxjs/Observable';
import {RecipeDetails} from "../models/RecipeDetails";

/*
  Generated class for the RecipeDetailsPage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecipeDetailsService {

  private URL: string;
  private _recipeDetails: BehaviorSubject<RecipeDetails>;
  private dataStore: {
    recipeDetails: RecipeDetails
  };

  constructor(public http: Http) {
    this.URL = 'http://localhost:5000/details';
    this.dataStore = { recipeDetails: new RecipeDetails() }
    this._recipeDetails = <BehaviorSubject<RecipeDetails>>new BehaviorSubject(this.dataStore.recipeDetails);
  }

  get recipeDetails() {
    return this._recipeDetails.asObservable();
  }

  requestRecipeDetails(recipe_id: string) {
    this.http.get(this.URL + '/' + recipe_id).map(response => response.json()).subscribe(data => {
      this.dataStore.recipeDetails = data;
      this._recipeDetails.next(data);
    }, this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error);
  }

}
