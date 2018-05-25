import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DataTablesModule } from 'angular-datatables';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
import { AppRoutingModule} from './app-routing.module';
import { ListWarehouseComponent } from './warehouse/list-warehouse/list-warehouse.component';
import { MainEffects} from './warehouse-stock/store/stock.effects';
import { EffectsModule} from '@ngrx/effects';
import { WarehouseEffects} from './warehouse/store/warehouse.effects';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditWarehouseComponent } from './warehouse/edit-warehouse/edit-warehouse.component';
import { DetailWarehouseComponent } from './warehouse/detail-warehouse/detail-warehouse.component';
import { ItemWarehouseComponent } from './warehouse/list-warehouse/item-warehouse/item-warehouse.component';
import { EditStockComponent } from './warehouse-stock/edit-stock/edit-stock.component';
import { environment } from './../environments/environment';
import { RecipeComponent } from './recipe/recipe.component';
import { ListRecipeComponent } from './recipe/list-recipe/list-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import { HttpClientModule} from '@angular/common/http';
import { DetailComponent } from './recipe/detail-recipe/detail.component';
import { TreeModule} from 'angular-tree-component';
import { ApiService} from './services/api.service';
import { ComponentsEffects} from './component/store/komp.effects';
import { DataserviceService} from './services/dataservice.service';
import { OperationComponent } from './warehouse-stock/operation-stock/operation.component';
import { AppComponent } from './app.component';
import { SummaryComponent } from './warehouse-stock/operation-stock/summary.component';


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
    DetailComponent,
    OperationComponent,
    SummaryComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MainEffects, WarehouseEffects, ComponentsEffects]),
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    DataTablesModule,
   !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ ApiService , DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
