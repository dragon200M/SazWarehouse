import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromKomponent from '../store/komp.reducers';
import {Komponent} from '../komponent.model';
import * as fromApp from '../../store/app.reducers';
import {ActivatedRoute, Router, Params} from '@angular/router';
import * as StockAction from '../../warehouse-stock/store/stock.actions';
import * as $ from 'jquery';
import 'datatables.net';
import {DataserviceService} from '../../services/dataservice.service';
import {Subject} from 'rxjs/Subject';



@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit, AfterViewInit, OnDestroy {


  komponentState: Observable<{komponents: Komponent[]}>;
  komponents: Komponent[];
  id: number;
  ktmp: Komponent;
  key: string = 'name';
  reverse: boolean = false;
  p: number = 1;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private ds: DataserviceService) { }

  ngOnInit() {

    this.komponentState = this.store.select('kompList');
    this.store.select('kompList').subscribe(r => {
      this.komponents = r.komponents;
    });

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  public selectRow(index: number, row: any) {
    this.ds.sendData(row);
    this.ktmp = row;
  }


  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }



}
