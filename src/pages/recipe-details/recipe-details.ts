import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {RecipeDetailsService} from "../../services/recipe-details.service";
import {RecipeDetails} from "../../models/RecipeDetails";


/*
  Generated class for the RecipeDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage {

  public recipe_id: string;
  public recipeDetails: RecipeDetails;

  constructor(public navCtrl: NavController, private navParams: NavParams, private recipeDetailsService: RecipeDetailsService, private platform: Platform) {
    this.recipe_id = navParams.get('selected');
    this.recipeDetails = new RecipeDetails();
  }

  ngOnInit() {
    this.recipeDetailsService.recipeDetails.subscribe((recipeDetails: RecipeDetails) => {
      this.recipeDetails = recipeDetails;
    });
    this.recipeDetailsService.requestRecipeDetails(this.recipe_id);
  }

  fullRecipe() {
    let url = this.recipeDetails.source.sourceRecipeUrl;
    this.platform.ready().then(() => {
      let browser = new InAppBrowser(url, '_system');
      browser.show();
    })
  }

}
