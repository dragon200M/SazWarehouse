import { NgModule } from '@angular/core';
import {RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {ListComponentComponent} from './component/list-component/list-component.component';
import {ListItemComponent} from './component/list-component/list-item/list-item.component';
import {KomponentActions} from './component/store/komp.actions';
import {KomponentComponent} from './component/komponent.component';
import {WarehouseStockComponent} from './warehouse-stock/warehouse-stock.component';
import {ListWarehouseComponent} from './warehouse/list-warehouse/list-warehouse.component';
import {WarehouseComponent} from './warehouse/warehouse.component';
import {DetailComponentComponent} from './component/detail-component/detail-component.component';
import {EditComponentComponent} from './component/edit-component/edit-component.component';
import {DetailWarehouseComponent} from './warehouse/detail-warehouse/detail-warehouse.component';
import {EditWarehouseComponent} from './warehouse/edit-warehouse/edit-warehouse.component';
import {RecipeComponent} from './recipe/recipe.component';
import {EditRecipeComponent} from './recipe/edit-recipe/edit-recipe.component';
import {ListRecipeComponent} from './recipe/list-recipe/list-recipe.component';
import {DetailComponent} from './recipe/detail-recipe/detail.component';
import {OperationComponent} from './warehouse-stock/operation-stock/operation.component';
import {SummaryComponent} from './warehouse-stock/operation-stock/summary.component';



const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'receptury', component: DetailComponent,
  children: [{path: 'edit/:id', component: EditComponentComponent}]},
  {path: 'second', component: RecipeComponent,
    children: [
      {path: 'firstchildcomp', component: EditRecipeComponent, outlet: 'firstchild'},
      {path: 'secondchildcomp', component: ListRecipeComponent, outlet: 'secondchild'}
    ]},
  {path: 'komponenty', component: KomponentComponent,
    children: [
      {path: 'new', component: EditComponentComponent},
      {path: ':id', component: DetailComponentComponent},
      {path: 'edit/:id', component: EditComponentComponent}
      ]},

  {path: 'magazyny', component: WarehouseComponent,
   children: [
     {path: 'new', component: EditWarehouseComponent },
     {path: ':id/addStock', component: WarehouseStockComponent}
   ]},
  {path: 'sztuki', component: OperationComponent},
  {path: 'counts', component: SummaryComponent},
  {path: ':id', component: WarehouseStockComponent }

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
