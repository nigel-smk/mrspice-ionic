import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";
import {Pairing} from "../../models/pairing";
import {RecipeDetailsPage} from "../recipe-details/recipe-details";

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
  public grid: Recipe[][];
  public selected: Pairing[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private recipesService: RecipesService) {
    this.recipes = [];
    this.grid = [];
    this.selected = navParams.get('selected');
  }

  ngOnInit() {
    this.recipesService.recipes.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;

      // fill grid with rows of two
      this.grid = [];
      let y = 0;
      this.grid[0] = new Array<Recipe>();
      for (let i = 0; i < recipes.length; i++) {
        let x = i % 2;
        this.grid[y][x] = recipes[i];
        if (x == 1) {
          y +=1;
          this.grid[y] = new Array<Recipe>();
        }
      }
      console.log(this.grid);
    });
    this.recipesService.requestRecipes(this.selected);

  }

  thumbnailClicked(event, recipe: Recipe) {
    let recipe_id = recipe.id;
    this.navCtrl.push(RecipeDetailsPage, {
      selected: recipe_id
    });
  }

}
