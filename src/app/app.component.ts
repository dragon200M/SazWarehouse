import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import {ActivatedRoute, Router} from '@angular/router';
import * as WarehouseAction from './warehouse/store/warehouse.actions';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as KomponentAction from '../app/component/store/komp.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  warehousesCheck = new Subject<boolean>();



  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('warehouseList').subscribe(
      (data: any) => {
       this.warehousesCheck = data.errors;
      });

  }

  refreshWarehouses() {
    this.store.dispatch(new WarehouseAction.FetchWarehouses());
    this.store.dispatch(new KomponentAction.FetchKomponent());
  }
}
