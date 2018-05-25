import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-warehouse-stock',
  templateUrl: './warehouse-stock.component.html',
  styleUrls: ['./warehouse-stock.component.scss']
})
export class WarehouseStockComponent implements OnInit, OnDestroy {
  id: string;
  urlcheck: boolean;
  stockItemsGo = new Subject<StockModel[]>();
  warehouse = new Subject<WarehouseModel>();
  w1: Subscription;
  w2: Subscription;
  w3: Subscription;
  w4: Subscription;
  w5: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromWarehouse.FeatureState>,
              private stockStore: Store<fromStock.FeatureState>) {

  }

  ngOnInit() {


    this.urlcheck = false;
    this.w1 = this.route.params.subscribe(
      params => { this.id = params['id'];

      //TODO dodac znacznik mówiacy o tym czy juz został pobrany dany stan magazynowy
      //moze kolejny sklep  i zmienna przy nazwie magazynu

    this.w2 = this.stockStore.select('warehouseStockList').subscribe(
          (p: any) => {
             const exist = p.downaloadedStock.indexOf(this.id);
             if (exist === -1) {
               this.stockStore.dispatch(new StockActions.AddWarehouseToCheckList(this.id));
               this.stockStore.dispatch(new StockActions.GetStockByWarehouseName(this.id));
               console.log('Pobieram1:' + this.id);
             }
          });
        this.w3 = this.stockStore.select('warehouseStockList').subscribe(
          (p: any) => {
            this.stockItemsGo = p.warehouseStock
              .filter(e => e._id._wName === this.id);
            console.log('Pobieram2:' + this.id);
          });
        this.w4 = this.store.select('warehouseList').subscribe(
        (p: any) => {
          const w = p.warehouses;
          this.warehouse = w.filter(mag => mag.name === this.id)[0];

        }
      );


      });



    this.w5 = this.route.url.subscribe(
      (data: any) => {
        for (const i of data) {
          if (i.path === 'addStock') {
            this.urlcheck = true;
          }
        }
      }
    );

  }

  ngOnDestroy() {
    this.w1.unsubscribe();
    this.w2.unsubscribe();
    this.w3.unsubscribe();
    this.w4.unsubscribe();
    this.w5.unsubscribe();
    console.log("Destroy: WarehouseStockComponent");
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
