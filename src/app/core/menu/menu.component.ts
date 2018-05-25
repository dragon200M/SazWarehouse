import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as fromApp from '../../store/app.reducers';
import * as WarehouseAction from '../../warehouse/store/warehouse.actions';
import * as StockAction from '../../warehouse-stock/store/stock.actions';
import * as KomponentAction from '../../component/store/komp.actions';


import 'rxjs/add/operator/filter';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  status = false;
  visibleWarehouses = new Subject<WarehouseModel[]>();
  unvisibleWarehouses = new Subject<WarehouseModel[]>();
  warehouseList: Observable <{warehouses: WarehouseModel[]}>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.router.navigateByUrl('/');
    this.store.dispatch(new WarehouseAction.FetchWarehouses());
    this.store.dispatch(new KomponentAction.FetchKomponent());
   // this.store.dispatch(new StockAction.FetchStock());
    this.warehouseList = this.store.select('warehouseList');
    this.store.select('warehouseList').subscribe(
      (w: any) => {
        const d = w.warehouses;
        this.visibleWarehouses =
          d.filter(a => a.available === true);
        this.unvisibleWarehouses =
          d.filter(a => a.available === false);
      }
    );
  }

  goToSelectedWareHouse(id: string): void {
    this.router.navigate(['./', id],
      {relativeTo: this.route});

  }
}
