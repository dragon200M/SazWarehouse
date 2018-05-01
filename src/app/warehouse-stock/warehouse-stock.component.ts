import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseModel} from '../warehouse/warehouse.model';
import {Types} from '../enums/types.enum';
import {Komponent} from '../component/komponent.model';
import {StockModel} from './stock.model';
import {Observable} from 'rxjs/Observable';
import * as fromApp from '../store/app.reducers';

import * as fromWarehouse from '../warehouse/store/warehouse.reducers';
import * as WarehouseActions from '../warehouse/store/warehouse.actions';
import * as fromStock from './store/stock.reducers';
import * as StockActions from './store/stock.actions';
import 'rxjs/add/operator/take';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-warehouse-stock',
  templateUrl: './warehouse-stock.component.html',
  styleUrls: ['./warehouse-stock.component.scss']
})
export class WarehouseStockComponent implements OnInit {
  id: string;
  urlcheck: boolean;
  stockItemsGo = new Subject<StockModel[]>();
  warehouse = new Subject<WarehouseModel>();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromWarehouse.FeatureState>,
              private stockStore: Store<fromStock.FeatureState>) {

  }

  ngOnInit() {
    this.urlcheck = false;
    this.route.params.subscribe(
      params => { this.id = params['id'];

      //TODO dodac znacznik mówiacy o tym czy juz został pobrany dany stan magazynowy
      //moze kolejny sklep  i zmienna przy nazwie magazynu

      this.stockStore.select('warehouseStockList').subscribe(
          (p: any) => {
             const exist = p.downaloadedStock.indexOf(this.id);
             if (exist === -1) {
               this.stockStore.dispatch(new StockActions.AddWarehouseToCheckList(this.id));
               this.stockStore.dispatch(new StockActions.GetStockByWarehouseName(this.id));
             }
          });
      this.stockStore.select('warehouseStockList').subscribe(
          (p: any) => {
            this.stockItemsGo = p.warehouseStock
              .filter(a => a.warehouse.name === this.id);
          });
      this.store.select('warehouseList').subscribe(
        (p: any) => {
          const w = p.warehouses;
          this.warehouse = w.filter(mag => mag.name === this.id)[0];
        }
      );


      });



    this.route.url.subscribe(
      (data: any) => {
        for (const i of data) {
          if (i.path === 'addStock') {
            this.urlcheck = true;
          }
        }
      }
    );

  }

  getStocks() {
    return this.stockItemsGo;
  }
  getwarehouse() {
    return this.warehouse;
  }


  getWarehouseName() {
    return this.id;
  }

}
