import { Component, OnInit } from '@angular/core';

import {WarehouseModel} from '../warehouse.model';
import * as WarehouseActions from '../store/warehouse.actions';
import * as fromWarehouse from '../store/warehouse.reducers';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromStock from '../../warehouse-stock/store/stock.reducers';
import * as StockActions from '../../warehouse-stock/store/stock.actions';
import {StockModel} from '../../warehouse-stock/stock.model';
import {ApiService} from '../../services/api.service';
import * as fromApp from '../../store/app.reducers';
import {Komponent} from '../../component/komponent.model';


@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss']
})
export class EditWarehouseComponent implements OnInit {
  warehouseForm: FormGroup;
  checkname = false;
  nameValid = false;
  visibleNameValid = false;
  id = '';
  editable =  false;
  stocks: StockModel[];
  freeKomponents: string[];
  st: any[];
  updateWarehouse = false;

  constructor(private route:  ActivatedRoute,
              private router: Router,
              private store:  Store<fromWarehouse.FeatureState>,
              private komponentStore: Store<fromApp.AppState>,
              private stockStore: Store<fromStock.FeatureState>,
              private api: ApiService) { }

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
            this.initStockState();
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

   const tmp = new WarehouseModel('1234', this.warehouseForm.controls['name'].value,
      w['description'], zm);
    tmp._visibleName = '';
    if(w['visible_name'] !== null){
      if ( (w['visible_name'].replace('/\s/g', '')).length > 3 ) {
        tmp._visibleName = w['visible_name'];
      }
      if(w['visible_name'].length === 0){
        tmp._visibleName = w['name'];
      }
    }
    if (this.warehouseForm.valid) {
      this.nameValid = false;
      this.visibleNameValid = false;
      if (this.editable){
        this.api.updateWarehouse(tmp, tmp._name).subscribe(el => {
          if(null !== el){
            console.log(el);
            if (el['resoult'] === 'Success') {
              this.stockStore.dispatch(new WarehouseActions.UpdateWarehouse({name: tmp._name, updated: tmp}));
            } else {
              this.updateWarehouse = true;
            }
          }

        });
      } else if(!this.editable) {
        this.store.dispatch(new WarehouseActions.StoreWarehouses(tmp));
        this.store.select('warehouseList').subscribe((data) => {
          this.checkname = data.errors;
          if (!this.checkname) {
            this.warehouseForm.reset();
          }
        });
      }


    } else {
      if ( !this.editable) {
        if (!this.warehouseForm.controls['name'].valid){
          this.nameValid = true;
        } else {
          this.nameValid = false;
        }
      }
      if (!this.warehouseForm.controls['visible_name'].valid) {
        this.visibleNameValid = true;
      } else {
        this.visibleNameValid = false;
      }
    }
  }

  private initForm() {
    let warehouseName = '';
    let warehouseDesc = '';
    let available = false;
    let visibleName = '';

    if (this.editable) {
      this.store.select('warehouseList').subscribe(w => {
        const tmpWarehouse = w.warehouses.filter(el => el._name === this.id)[0];
        warehouseName = tmpWarehouse._name;
        warehouseDesc = tmpWarehouse._description;
        available = tmpWarehouse._available;
        visibleName = tmpWarehouse._visibleName;
      });
    }

    this.warehouseForm = new FormGroup({
      'name': new FormControl({value: warehouseName, disabled: this.editable},[Validators.required , Validators.minLength(5), Validators.maxLength(60)] ),
      'description': new FormControl(warehouseDesc),
      'available': new FormControl(available),
      'visible_name': new FormControl(visibleName,[Validators.required , Validators.minLength(5), Validators.maxLength(60)])}
      );
  }

  initStockState() {
    this.stockStore.select('warehouseStockList').subscribe(e => {
      const exist = e.downaloadedStock.indexOf(this.id);
      if (exist === -1) {
        this.stockStore.dispatch(new StockActions.AddWarehouseToCheckList(this.id));
        this.stockStore.dispatch(new StockActions.GetStockByWarehouseName(this.id));
      }
      this.stocks = e.warehouseStock.filter(st => st.warehouse._name === this.id);

    });

  }



}

interface FreeKomponents {
  komponenty: Komponent;
  withoutStock: boolean;
}
