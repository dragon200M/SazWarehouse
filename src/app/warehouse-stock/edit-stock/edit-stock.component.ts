import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

import * as fromStock from '../store/stock.reducers';
import {Observable, Subscribable} from 'rxjs/Observable';
import {Komponent} from '../../component/komponent.model';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {StockModel} from '../stock.model';
import * as StockActions from './../store/stock.actions';
import {Types} from '../../enums/types.enum';
import {ApiService} from '../../services/api.service';
import {Units} from '../../enums/units.enums';


@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit , OnDestroy, OnChanges {
  @Input() name;
  @Input() stocksState;
  @Input() freeKomponents;

  warehousedesc = '';
  stockForm: FormGroup;
  komponentState: Observable<{komponents: Komponent[]}>;
  komponents: FreeKomponents[];
  tmpKomponents: FreeKomponents[];
  selectedKomponentDesc = '';
  selectedKomponentType = '';
  selectedKomponent: Komponent;
  warehouse: WarehouseModel;
  checkSortList = [];
  newStocks: TmpStock[];
  freeKomponentsTmp: FreeKomponents[];
  available: {  komponenty: any, withoutStock: false};
  formCheck = false;
  tmpSelectedKomponent: FreeKomponents;
  insertCheck = false;
  deleteCheck = false;
  warehouseQuantity =0;


  constructor(
    private store: Store<fromApp.AppState>,
    private stockStore: Store<fromStock.FeatureState>,
    private api: ApiService
  ) { }

  ngOnInit() {

    console.log('init edit stock list');

    this.komponentState = this.store.select('kompList');

    this.initFreeKomponents();

    this.initForm();

  }


  ngOnChanges(): void {
    this.newStocks = this.toTmpStock(this.stocksState);
    if(this.newStocks){
      this.warehouseQuantity = this.newStocks.length;
    }
    this.initFreeKomponents();
  }

  private initForm() {
    const komponentName = '';
    const stock = '';
    const gl = false;
    const kp = false;
    const ts = false;
    const sz = false;

    this.stockForm = new FormGroup(
      {
        'komponentName': new FormControl(komponentName, [ Validators.required, Validators.minLength(1)]),
        'stock': new FormControl(stock,[ Validators.required, Validators.min(1)]),
        'gl': new FormControl(gl),
        'kp': new FormControl(kp),
        'ts': new FormControl(ts),
        'st': new FormControl(sz)}
    );
  }

  addStockToWarehouse() {
     const formValid = this.stockForm.valid;
     this.formCheck = !formValid;

     if ( formValid ) {
       const m = this.name;
       const k: FreeKomponents = this.stockForm.controls['komponentName'].value;
       const s = this.stockForm.controls['stock'].value;

       this.api.saveStock(m, k.komponenty._name, s).subscribe(w => {

         if ( w['resoult'] === 'Success'){
           let warehouseTmp: WarehouseModel;
           this.store.select('warehouseList').subscribe(element => {
             warehouseTmp = element.warehouses.filter(ew => ew._name === this.name)[0];
           });
           const stockTmp = new StockModel({_wName: this.name, _kName: this.tmpSelectedKomponent.komponenty._name},
             warehouseTmp, this.tmpSelectedKomponent.komponenty, s);
           console.log(stockTmp);
           this.store.dispatch(new StockActions.AddStock(stockTmp));
           this.stockForm.reset();

         } else {
           this.insertCheck = true;
         }
       });
     }
  }

  delStockToWarehouse() {
    const nameKomponentValid = this.stockForm.controls['komponentName'].valid;
    this.formCheck = !nameKomponentValid;

    if ( nameKomponentValid ) {
      const m = this.name;
      const k: FreeKomponents = this.stockForm.controls['komponentName'].value;

      this.api.deleteStock(m, k.komponenty._name).subscribe(del => {

        if (del['resoult'] === 'Success') {
          this.store.dispatch(new StockActions.DeleteStock({warehouse:m, komponent:k.komponenty._name}));

        } else {
          console.log("Brak możliwości usunięcia");
        }

      });

    }
  }


  selectedItem(event) {
    const tmpNewStocks = this.newStocks;
    this.tmpSelectedKomponent = event;


    if(this.tmpSelectedKomponent) {
      console.log(this.tmpSelectedKomponent);
      const c1 = tmpNewStocks.filter(tns => tns._name === this.tmpSelectedKomponent.komponenty._name)[0];

      if (c1) {
        if (c1._stock > 0) {
           this.deleteCheck = true;
        } else {
           this.deleteCheck = false;
        }
      }

    }
  }

  ngOnDestroy() {
    console.log('Edit Stock destroy');

  }

  checkValue(event: any) {
    const check = event.target.checked;
    const val = event.target.value;

    if (check) {
      this.checkSortList.push(val);
    }
    if (!check) {
      const ind = this.checkSortList.indexOf(val);
      if (ind > -1) {
        this.checkSortList.splice(ind,1);
      }
    }

    if (this.checkSortList.length > 0) {
      this.tmpKomponents = this.komponents.filter(k => this.checkkey(k.komponenty._typ_1));
    } else {
      this.tmpKomponents = this.komponents;
    }
    this.tmpKomponents.sort( (a, b) => a.komponenty._name < b.komponenty._name  ? -1 : a.komponenty._name > b.komponenty._name  ? 1 : 0);
  }

  checkkey(typ: Types) {
    const tmp = this.checkSortList.findIndex(el => el === typ);
    if (tmp > -1) {
      return true;
    }
    return false;
  }

  toTmpStock(sttmp: StockModel[]) {
    let t: TmpStock[] = [];

    sttmp.forEach(el => {
      t.push({
        _name: el.component._name,
        _description: el.component._description,
        _typ_1: el.component._typ_1,
        _stock: el._stock,
        _units: el.component._units
      });
    });

    return t;
  }

  initFreeKomponents() {
    this.api.getFreeComponents().subscribe(el => {
      this.komponentState.subscribe(k => {
        const ba: FreeKomponents[] = [];
        const km = k.komponents;
        const ab = km.filter(k1 => el.includes(k1._name));

        ab.forEach( b =>
          ba.push({komponenty: b, withoutStock: true})
        );
        this.stocksState.forEach(stt => {
          ba.push({komponenty: stt.component, withoutStock: false});
        });

        ba.sort( (a, b) => a.komponenty._name < b.komponenty._name  ? -1 : a.komponenty._name > b.komponenty._name  ? 1 : 0);
        this.checkSortList = [];
        this.tmpKomponents = ba;
        this.komponents = ba;

      });
    });
  }




  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  f: number = 1;
}

interface _id {
  _kName: string;
  _wName: string;
}
interface TmpStock {
  _name: string;
  _description: string;
  _typ_1: Types;
  _stock: number;
  _units: Units;
}
interface FreeKomponents {
  komponenty: Komponent;
  withoutStock: boolean;
}
