import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as fromWarehouses from '../store/warehouse.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {WarehouseModel} from '../warehouse.model';
@Component({
  selector: 'app-detail-warehouse',
  templateUrl: './detail-warehouse.component.html',
  styleUrls: ['./detail-warehouse.component.scss']
})
export class DetailWarehouseComponent implements OnInit {
   warehouse: WarehouseModel;
   id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  this.route.params
      .subscribe(
     (params: Params) => {
          this.id = params['id'];
          this.store.select('warehouseList').take(1)
          .subscribe((warState: fromWarehouses.State) => {

            const tmp = warState.warehouses.filter(
              w => w._name === this.id
            );
            this.warehouse = tmp[0];

          });
     }
      );
  }

}
