import { Component, OnInit } from '@angular/core';

import {WarehouseModel} from '../warehouse.model';
import * as WarehouseActions from '../store/warehouse.actions';
import * as fromWarehouse from '../store/warehouse.reducers';

import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss']
})
export class EditWarehouseComponent implements OnInit {
  warehouseForm: FormGroup;
  checkname = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromWarehouse.FeatureState>) { }

  ngOnInit() {
    this.initForm();
  }

  onNewWarehouse() {
    const w = this.warehouseForm.value;
    let zm = false;
    if (w['available'] === 'true') {
      zm = true;
    }

   const tmp = new WarehouseModel('1234', w['name'],
      w['description'], zm);
    //nazwa wyswietlana wieksza od 3 znakow, biale znaki pomija
    if ( (w['visible_name'].replace(/\s/g, '')).length > 3 ) {
      tmp.visibleName = w['visible_name'];
    }

   // this.store.dispatch(new WarehouseActions.AddWarehouse(tmp));
   this.store.dispatch(new WarehouseActions.StoreWarehouses(tmp));
    this.store.select('warehouseList').subscribe((data) => {
      this.checkname = data.errors;
    });
  }

  private initForm() {
    const warehouseName = '';
    const warehouseDesc = '';
    const available = '';
    const visibleName = '';

    this.warehouseForm = new FormGroup({
      'name': new FormControl(warehouseName),
      'description': new FormControl(warehouseDesc),
      'available': new FormControl(available),
      'visible_name': new FormControl(visibleName)}
      );
  }

}
