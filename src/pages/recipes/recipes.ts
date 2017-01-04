import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";
import {Pairing} from "../../models/pairing";

/*
  Generated class for the RecipesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  public recipes: Recipe[];
  public selected: Pairing[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private recipesService: RecipesService) {
    this.recipes = [];
    this.selected = navParams.get('selected');
  }

  ngOnInit() {
    this.recipesService.recipes.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipesService.requestRecipes(this.selected);

  }

}
