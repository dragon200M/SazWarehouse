import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
export class StockListComponent implements OnInit, AfterViewInit {
  @Input() stockItems;
  @Input() warehouse;
  @Input() quantity;

  stock: StockModel;
  selectedRow: number;
  constructor() {

  }

  ngOnInit() {

  }


  ngAfterViewInit(): void {
    console.log(this.stockItems);
    if (this.stockItems) {
      this.quantity = this.stockItems.length;
    }
  }

  setClickedRow(i: number, s: StockModel) {
    this.selectedRow = i;
    this.stock = s;
  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  f: number = 1;
}
