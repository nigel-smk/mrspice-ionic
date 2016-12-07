import {Component, OnInit, ViewChild} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import { PairingsService } from '../../services/pairings.service';
import {Pairing} from "../../models/pairing";
import {Observable, Subscription} from "rxjs";

@Component({
  templateUrl: 'ingredients.html'
})
export class IngredientsPage implements OnInit{

  pairingsSubscription: Subscription
  recommendedPairings: Pairing[];
  selectedPairings: Pairing[];
  filterTerm: string;
  errorMessage: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private pairingsService: PairingsService) {
    this.selectedPairings = [];
    this.recommendedPairings = [];
    this.filterTerm = '';
  }

  ngOnInit(): void {
    this.pairingsSubscription = this.pairingsService.pairings.subscribe(
      (pairings: Pairing[]) => {
        this.recommendedPairings = pairings;
      });
    this.pairingsService.requestPairings([]);
  }

  recommendedTapped(event, ingt: Pairing) {
    this.selectedPairings.push(ingt);
    this.pairingsService.requestPairings(this.selectedPairings);
    this.filterTerm = '';
    this.filterPairings();
  }

  selectedTapped(event, pairing: Pairing) {
    this.removeFromSelected(pairing);
  }

  reset(event) {
    this.selectedPairings = [];
    this.pairingsService.requestPairings([]);
  }

  filterPairings() {
    this.pairingsService.setFilter(this.filterTerm);
  }

  doInfinite(infiniteScroll) {
    this.pairingsService.more();
    infiniteScroll.complete();
  }

  removeFromSelected(pairing: Pairing) {
    let removeIndex = this.selectedPairings.map((selected: Pairing) => {
      return selected.ingt;
    }).indexOf(pairing.ingt);

    if (~removeIndex) {
      this.selectedPairings = this.selectedPairings.splice(removeIndex, 1);
      this.pairingsService.requestPairings(this.selectedPairings);
    }
  }

}
