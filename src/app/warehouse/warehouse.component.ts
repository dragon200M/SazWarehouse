import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WarehouseModel} from './warehouse.model';
import { Store } from '@ngrx/store';
import * as fromWarehouse from './store/warehouse.reducers';
import * as WarehousesAction from './store/warehouse.actions';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  warehouseList: Observable<{warehouses: WarehouseModel[]}>;
  urlcheck: boolean;

  constructor(private store: Store<fromWarehouse.FeatureState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
 //   this.store.dispatch(new WarehousesAction.FetchWarehouses());
    this.warehouseList = this.store.select('warehouseList');
  }

  onNewWarehouse() {
    this.router.navigate(['new'],
      {relativeTo: this.route});
  }

}
