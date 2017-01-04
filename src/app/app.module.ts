import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { IngredientsPage } from '../pages/ingredients/ingredients';
import { PairingsService } from '../services/pairings.service';
import {RecipesPage} from "../pages/recipes/recipes";
import {RecipesService} from "../services/recipes.service";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    IngredientsPage,
    RecipesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    IngredientsPage,
    RecipesPage
  ],
  providers: [PairingsService, RecipesService]
})
export class AppModule {}
