import { Component, OnInit } from '@angular/core';

import {WarehouseModel} from '../warehouse.model';
import * as WarehouseActions from '../store/warehouse.actions';
import * as fromWarehouse from '../store/warehouse.reducers';

import {ActivatedRoute, Params, Router} from '@angular/router';
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
  id = '';
  editable =  false;

  constructor(private route:  ActivatedRoute,
              private router: Router,
              private store:  Store<fromWarehouse.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((p: Params) =>{
      this.id = p['id'];
      console.log(p);
    });

    this.route.url.subscribe(
      (data: any) => {
        for (const i of data) {
          if (i.path === 'addStock') {
            this.editable = true;
            this.initForm();
          }
        }
      });

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
    let warehouseName = '';
    let warehouseDesc = '';
    let available = false;
    let visibleName = '';

    if (this.editable) {
      this.store.select('warehouseList').subscribe(w => {
        const tmpWarehouse = w.warehouses.filter(el => el.name === this.id)[0];
        warehouseName = tmpWarehouse.name;
        warehouseDesc = tmpWarehouse.description;
        available = tmpWarehouse.available;
        visibleName = tmpWarehouse.visibleName;
      });
    }

    this.warehouseForm = new FormGroup({
      'name': new FormControl({value: warehouseName, disabled: this.editable} ),
      'description': new FormControl(warehouseDesc),
      'available': new FormControl(available),
      'visible_name': new FormControl(visibleName)}
      );
  }

}
