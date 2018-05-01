import {Component, EventEmitter,Input, OnInit, Output} from '@angular/core';
import {WarehouseModel} from '../../warehouse.model';


@Component({
  selector: 'app-item-warehouse',
  templateUrl: './item-warehouse.component.html',
  styleUrls: ['./item-warehouse.component.scss']
})
export class ItemWarehouseComponent implements OnInit {
  @Input() warehouse: WarehouseModel;
  @Input() index: string;

  constructor() { }

  ngOnInit() {
  }

}
