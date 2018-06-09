import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseModel} from '../warehouse/warehouse.model';
import {StockModel} from './stock.model';
import * as fromWarehouse from '../warehouse/store/warehouse.reducers';
import * as fromStock from './store/stock.reducers';
import * as StockActions from './store/stock.actions';
import 'rxjs/add/operator/take';
import {Subject} from 'rxjs/Subject';


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
  quantity = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromWarehouse.FeatureState>,
              private stockStore: Store<fromStock.FeatureState>) {

  }

  ngOnInit() {


    this.urlcheck = false;
    this.route.params.subscribe(
      params => { this.id = params['id'];


    this.stockStore.select('warehouseStockList').subscribe(
          (p: any) => {
             const exist = p.downaloadedStock.indexOf(this.id);
             if (exist === -1) {
               this.stockStore.dispatch(new StockActions.AddWarehouseToCheckList(this.id));
               this.stockStore.dispatch(new StockActions.GetStockByWarehouseName(this.id));
               console.log('Pobieram1:' + this.id);
             }
          });
     this.stockStore.select('warehouseStockList').subscribe(
          (p: any) => {
            const el = p.warehouseStock
              .filter(e => e._id._wName === this.id);
            this.stockItemsGo = el;
            console.log('Pobieram2:' + this.id);
            this.quantity = el.length;
          });
     this.store.select('warehouseList').subscribe(
        (p: any) => {
          const w = p.warehouses;
          console.log(w);
          this.warehouse = w.filter(mag => mag._name=== this.id)[0];
          console.log(this.warehouse);
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

  ngOnDestroy() {
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
