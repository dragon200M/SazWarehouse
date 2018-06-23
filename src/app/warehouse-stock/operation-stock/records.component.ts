import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DatepickerOptions} from 'ng2-datepicker';
import * as plLocale from 'date-fns/locale/pl';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  key: string = 'name';
  reverse: boolean = false;
  g2: number = 1;
  records: StockRecords[];
  date: Date = new Date();
  date2: Date = new Date();
  quantity = 0;
  filter = '';
  options: DatepickerOptions = {
    locale: plLocale,
    barTitleIfEmpty: 'Click to select a date',
    displayFormat: 'D MMM YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd'
  };

  constructor(private api: ApiService) {
    this.date.setHours(0,0,0,0);
  }

  ngOnInit() {
    this.date.setHours(10,0,0,0);
    this.date2.setHours(10,0,0,0);

    this.date2.setDate(this.date2.getDate() + 1);

    const start1 = this.date.toISOString().split('T')[0]
      .replace('-','')
      .replace('-','');
    const end1 = this.date2.toISOString().split('T')[0]
      .replace('-','')
      .replace('-','');
    this.api.getStockRecord(start1, end1).subscribe(el => {

      this.records = [];
      el.forEach(w => {
        w.time = w.time.replace('T', '  / ');
        console.log(w.time);
        this.records.push(w);
      });
      this.quantity = this.records.length;
    });
  }


  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getRecords() {
    this.date.setHours(10,0,0,0);
    this.date2.setHours(10,0,0,0);
    const start = this.date.toISOString().split('T')[0]
      .replace('-','')
      .replace('-','');
    const end = this.date2.toISOString().split('T')[0]
      .replace('-','')
      .replace('-','');

    this.api.getStockRecord(start, end).subscribe(el => {
      this.records = [];
      el.forEach(w => {
        w.time = w.time.replace('T', '  / ');
        console.log(w.time);
        this.records.push(w);
      });
      this.quantity = this.records.length;
    });
  }

}

interface StockRecords {
  time: string;
  warehouseName: string;
  komponentName: string;
  oldStock: number;
  newStock: number;
  type: string;
}
