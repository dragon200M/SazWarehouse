import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild,
  ViewChildren
} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import 'datatables.net';
import {ApiService} from '../../services/api.service';
import {Subject} from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as StockActions from './../store/stock.actions';



@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit, AfterViewInit, OnDestroy {
  fileToUpload: FileList = null;
  fileToUpload2: File = null;

  stockUrl = '';


  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChildren('tab', {read: ElementRef}) tds: QueryList<ElementRef>;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  tabledataOperation: StockHolder[];
  newStockTable: UpdateList[] = [];
  updateCheck = false;
  updateInfo = false;
  stockCheck: boolean;



  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {


  }

  ngOnInit() {
    this.api.getStock().subscribe(r => {
      this.tabledataOperation = r;
    });

    this.stockUrl = this.api.getStockFile();

  }
  ngAfterViewInit() {

    console.log('after view init');


  }
  ngOnDestroy() {

  }

  handleFileUpload(file: FileList) {

    this.fileToUpload2 = file.item(0);
    this.fileToUpload = file;
  }



  getTableData() {

    this.newStockTable.length = 0;
    this.stockCheck = false;
    this.tds.forEach( d => {
      const tmp = d.nativeElement.children;
      let to = parseFloat(tmp[7].children[0].value);
      let tin = parseFloat(tmp[6].children[0].value);
      let tst = parseFloat(tmp[5].textContent);

       if (isNaN(to)) {to = 0; }
       if (isNaN(tin)) {tin = 0; }
       if (isNaN(tst)) {tst = 0; }

      const st: UpdateList = {
        warehouse: tmp[0].textContent, komponentName: tmp[1].textContent,
        stock: tst , in: tin ,
        outgo: to,
        newStock: tst + tin - to
      };

      if ( st.in > 0 || st.outgo > 0) {
        if (st.newStock < 0) {
          this.stockCheck = true;
        }
        this.newStockTable.push(st);
      }
    });

  }

  onUpload() {
    if (null !== this.fileToUpload ) {
      if (this.fileToUpload.length > 0) {


        let tmp: UpdateServerList[] = [];
        const updateList: UpdateList[] = [];
        this.api.uploadFiles(this.fileToUpload).subscribe(w => {
          tmp = w;
          console.log(tmp);
          tmp.forEach(e => {
            if (e.type !== 'ERROR') {
              const stock = this.tabledataOperation.filter(s => s.wareName === e.warehouseName && s.komName === e.komponentName)[0];
              const tmpUpdate: UpdateList = {
                warehouse: e.warehouseName,
                komponentName: e.komponentName,
                stock: stock.stock,
                outgo: 0,
                in: e.newStock,
                newStock: stock.stock + e.newStock
              };

              updateList.push(tmpUpdate);
            } else {
              const tmpUpdate: UpdateList = {
                warehouse: '',
                komponentName: e.komponentName,
                stock: -1,
                outgo: -1,
                in: e.newStock,
                newStock: -1
              };
              updateList.push(tmpUpdate);
            }

          });
          this.newStockTable = updateList;
          const checkPoint = updateList.filter(cp => cp.newStock < 0);
          if (checkPoint.length > 0) {
            this.stockCheck = true;

           }
        });
      }
    }

  }

  saveData() {

    const updList: UpdateServerList[] = [];
    this.newStockTable.forEach(el => {
      if (el.in > 0) {
        const a: UpdateServerList = {
          warehouseName: el.warehouse,
          komponentName: el.komponentName,
          oldStock: 0,
          newStock: el.in,
          type: 'ADD'
        };
        updList.push(a);
      }
      if (el.outgo > 0) {
        const a: UpdateServerList = {
          warehouseName: el.warehouse,
          komponentName: el.komponentName,
          oldStock: 0,
          newStock: el.outgo,
          type: 'REMOVE'
        };
        updList.push(a);
      }
    });

   const wynik =  this.api.updateStockList(updList);
   wynik.subscribe(w => {
     console.log(updList);
     const tmpList = [];
     if (updList.length > 0) {
       updList.forEach(ul => tmpList.push(ul.warehouseName));
     }

     if (w.length === 0) {
       this.api.getStock().subscribe(r => {
         this.newStockTable.length = 0;
         this.tabledataOperation = r;
         this.updateInfo = true;
         this.updateCheck = false;
         setTimeout(function() {
           this.updateInfo = false;
         }.bind(this), 3000);
         this.store.dispatch(new StockActions.DeleteStockByName(tmpList));
         tmpList.forEach(t => {
           this.store.dispatch(new StockActions.RemoveWarehouseFromCheckList(t));
         });
       });
     } else {
        this.updateInfo = false;
        this.updateCheck = true;
     }

   });
  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  f2: number = 1;

  key2: string = 'name';
  reverse2: boolean = false;
  sort2(key) {
    this.key2 = key;
    this.reverse2 = !this.reverse2;
  }
  f3: number = 1;


  private initForm() {
    // this.uploadForm = new FormGroup(
    //
    // );

  }

}

interface UpdateList {
  warehouse: string ;
  komponentName: string ;
  stock: number;
  outgo: number ;
  in: number;
  newStock: number;
}

interface UpdateServerList {
  warehouseName: string;
  komponentName: string;
  oldStock: number;
  newStock: number;
  type: string;
}

interface StockHolder {
  wareName: string ;
  komName: string ;
  komDesc: string;
  types: string;
  units: string;
  stock: number;
  posible: Posibletmp[];
}
interface Posibletmp {
  komponentName: string;
  posible: number;
}
