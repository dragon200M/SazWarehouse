import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as StockAction from '../store/stock.actions';
import * as fromStock from '../store/stock.reducers';
import {Observable, Subscribable} from 'rxjs/Observable';
import {Komponent} from '../../component/komponent.model';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {StockModel} from '../stock.model';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit , OnDestroy {
  @Input() name;
  warehousedesc = '';
  stockForm: FormGroup;
  komponentState: Observable<{komponents: Komponent[]}>;
  selectedKomponentDesc = '';
  selectedKomponentType = '';
  selectedKomponent: Komponent;
  warehouse: WarehouseModel;


  constructor(
    private store: Store<fromApp.AppState>,
    private stockStore: Store<fromStock.FeatureState>
  ) { }

  ngOnInit() {
    this.komponentState = this.store.select('kompList');

    this.initForm();
  }

  private initForm() {
    const komponentName = '';
    const stock = '';
    this.stockForm = new FormGroup(
      {
        'komponentName': new FormControl(komponentName),
        'stock': new FormControl(stock)}
    );
  }

  addStockToWarehouse() {

  }
  selectedItem(event) {
    this.komponentState.take(1).subscribe(
      (p: any) => {
        const tmp = p.komponents[event];
        this.selectedKomponent = tmp;
        this.selectedKomponentDesc = tmp._description;
        this.selectedKomponentType = tmp._typ_1;
      }
    );
  }

  ngOnDestroy() {
    console.log('Edit Stock destroy');

  }
}

interface _id {
  _kName: string;
  _wName: string;
}
