import {Component, OnInit} from "@angular/core";

import { NavController, NavParams } from 'ionic-angular';

import { QueryService } from '../../services/query-service.service';

@Component({
  templateUrl: 'ingredients.html'
})
export class IngredientsPage implements OnInit{

  recommendedIngredients: any[];
  filteredRecommendedIngredients: any[];
  selectedIngredients: any[];
  searchTerm: string;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private queryService: QueryService) {
    this.selectedIngredients = [];
    this.searchTerm = '';
  }

  ngOnInit(): void {
    this.getPairings([]);
  }

  //TODO create an IngredientResult dto class
  recommendedTapped(event, ingredient) {
    this.selectedIngredients.push(ingredient);
    this.getPairings(this.selectedIngredients.map(function(currentValue, index, array){
      return currentValue.ingredient;
    }));
    this.searchTerm = '';
  }

  selectedTapped(event, ingredient) {
    let removedIndex = this.selectedIngredients.findIndex((i): boolean => {
      return i.ingredient == ingredient.ingredient;
    });
    let before = this.selectedIngredients.slice(0, removedIndex);
    let after = this.selectedIngredients.slice(removedIndex + 1, this.selectedIngredients.length);
    this.selectedIngredients = before.concat(after);
    
    this.getPairings(this.selectedIngredients.map(function(currentValue, index, array){
      return currentValue.ingredient;
    }));
  }

  reset(event) {
    this.selectedIngredients = [];
    this.recommendedIngredients = [];
    this.getPairings([]);
  }

  getPairings(ingredients: string[]): void {
    this.queryService.getPairings(ingredients)
      .subscribe(
        //slice result to show only 100 items
        //TODO implement lazy loading
        pairings => {
          this.recommendedIngredients = pairings.slice(0, 1000);
          //TODO this is cottage hacking. Need to implement the filtering proper. With observable.
          this.filteredRecommendedIngredients = this.recommendedIngredients;
        },
        error => this.errorMessage = <any>error
    );
  }

  setFilteredItems(): void {
    this.filteredRecommendedIngredients = this.recommendedIngredients.filter((item) => {
      return item.ingredient.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });

  }

}
