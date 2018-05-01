import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { KomponentComponent } from './component/komponent.component';
import { ListComponentComponent } from './component/list-component/list-component.component';
import { EditComponentComponent } from './component/edit-component/edit-component.component';
import { DetailComponentComponent } from './component/detail-component/detail-component.component';
import { ListItemComponent } from './component/list-component/list-item/list-item.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.reducers';

import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseStockComponent } from './warehouse-stock/warehouse-stock.component';
import { StockListItemComponent } from './warehouse-stock/list-stock/stock-list_item/stock-list-item.component';
import { StockListComponent } from './warehouse-stock/list-stock/stock-list.component';
import { MenuComponent } from './core/menu/menu.component';
import { HomeComponent } from './core/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { ListWarehouseComponent } from './warehouse/list-warehouse/list-warehouse.component';
import {MainEffects} from './warehouse-stock/store/stock.effects';
import {EffectsModule} from '@ngrx/effects';
import {WarehouseEffects} from './warehouse/store/warehouse.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditWarehouseComponent } from './warehouse/edit-warehouse/edit-warehouse.component';
import { DetailWarehouseComponent } from './warehouse/detail-warehouse/detail-warehouse.component';
import { ItemWarehouseComponent } from './warehouse/list-warehouse/item-warehouse/item-warehouse.component';
import { EditStockComponent } from './warehouse-stock/edit-stock/edit-stock.component';
import { environment } from './../environments/environment';
import { RecipeComponent } from './recipe/recipe.component';
import { ListRecipeComponent } from './recipe/list-recipe/list-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    KomponentComponent,
    ListComponentComponent,
    EditComponentComponent,
    DetailComponentComponent,
    ListItemComponent,
    WarehouseComponent,
    WarehouseStockComponent,
    StockListItemComponent,
    StockListComponent,
    MenuComponent,
    HomeComponent,
    ListWarehouseComponent,
    EditWarehouseComponent,
    DetailWarehouseComponent,
    ItemWarehouseComponent,
    EditStockComponent,
    RecipeComponent,
    ListRecipeComponent,
    EditRecipeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MainEffects, WarehouseEffects]),
    FormsModule,
    ReactiveFormsModule,
   !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
