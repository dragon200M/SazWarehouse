import {Component, Input, OnInit} from '@angular/core';
import {StockModel} from '../stock.model';
import {WarehouseModel} from '../../warehouse/warehouse.model';
import {Komponent} from '../../component/komponent.model';
import {Types} from '../../enums/types.enum';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @Input() stockItems;
  @Input() warehouse;

  stock: StockModel;
  selectedRow: number;
  constructor() {

  }

  ngOnInit() {

  }
  setClickedRow(i: number, s: StockModel) {
    this.selectedRow = i;
    this.stock = s;
  }
}
