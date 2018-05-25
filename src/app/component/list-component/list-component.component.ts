import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit, AfterViewInit {


  komponentState: Observable<{komponents: Komponent[]}>;
  id: number;
  ktmp: Komponent;
  public tableWidget: any;


  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private ds: DataserviceService) { }

  ngOnInit() {
    this.komponentState = this.store.select('kompList');
    // this.activeRouter.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //   }
    // )
    //TODO komponent -> podglad stanu na magazynach
    let tmp = [];
    // this.komponentState.take(1).subscribe(
    //   (k: any) => {
    //     tmp = k.komponents;
    //   }
    // );
    let tmpStock = [];
    const warehouseKomponent = [];
    this.store.select('warehouseStockList').subscribe(
      (p: any) => {
        tmpStock = p.warehouseStock;
      }
    );
     let t = {
      nazwa: '',
      magazyn: '',
      ilosc: 0
    };
    for (const a of tmp) {
      const c = tmpStock.filter(p => p.komponent._name === a.name);
      for (const d of c) {
        t.nazwa = a.name;
        t.magazyn = d.warehouse.name;
        t.ilosc = d._stock;
        warehouseKomponent.push(t);
      }
    }
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  private initDatatable(): void {
    const exampleId: any = $('#bootstrap-data-table');
    this.tableWidget = exampleId.DataTable({
      pagingType: 'full_numbers',
      pageLength: 20,
      select: true,
      'autoWidth': true
    });
  }

  public selectRow(index: number, row: any) {
    this.ds.sendData(row);
    this.ktmp = row;
  }



}
