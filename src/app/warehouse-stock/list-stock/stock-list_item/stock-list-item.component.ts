import {Component, Input, OnInit} from '@angular/core';
import {StockModel} from '../../stock.model';

@Component({
  selector: 'app-stock-list-item',
  templateUrl: './stock-list-item.component.html',
  styleUrls: ['./stock-list-item.component.scss']
})
export class StockListItemComponent implements OnInit {
  @Input() stock_item: StockModel;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
