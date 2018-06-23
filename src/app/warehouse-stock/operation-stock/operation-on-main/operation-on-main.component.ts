import {
  Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ApiService} from '../../../services/api.service';


@Component({
  selector: 'app-operation-on-main',
  templateUrl: './operation-on-main.component.html',
  styleUrls: ['./operation-on-main.component.scss']
})
export class OperationOnMainComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChildren('tab', {read: ElementRef}) tds: QueryList<ElementRef>;


  tabledataOperation: StockHolder[] = [];
  newStockTable: UpdateList[] = [];
  updateCheck = false;
  updateInfo = false;
  stockCheck: boolean;
  filter = '';
  term = '';


  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) { }

  ngOnInit() {

    this.api.getMainComponents().subscribe(k => {
      console.log(k);

      k.forEach(el => {
        const tmp: StockHolder = {
          wareName: '',
          komName: el._name,
          komDesc: el._description,
          types: el._typ_1,
          units: el._units,
          stock: 0,
          posible: null
        };

       this.tabledataOperation.push(tmp);

      });

    });
  }

  ngOnDestroy() {

  }


  getTableData() {
    const newStockTableTmp: UpdateList[] = [];
    this.stockCheck = false;
    this.tds.forEach( d => {
      const tmp = d.nativeElement.children;
      let to = parseFloat(tmp[4].children[0].value);
      if (isNaN(to)) {
        to = 0;
      }
      const st: UpdateList = {
        warehouse: '', komponentName: tmp[0].textContent,
        stock: 0,
        in: 0,
        outgo: to,
        newStock: 0
      };
      if ( st.in > 0 || st.outgo > 0) {
        if (st.newStock < 0) {
          this.stockCheck = true;
        }
        newStockTableTmp.push(st);
      }
    });



    const updList: UpdateServerList[] = [];
    newStockTableTmp.forEach(el => {
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

    this.api.getPieceQuantity(updList).subscribe(w => {
      this.newStockTable.length = 0;
      w.forEach(el => {
        const st: UpdateList = {
          warehouse: el.warehouseName,
          komponentName: el.komponentName,
          stock: el.oldStock,
          in: 0,
          outgo: el.newStock,
          newStock: el.oldStock - el.newStock
        };
        this.newStockTable.push(st);
        if ( st.newStock < 0) {
          this.stockCheck = true;
        }
      });
    });
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
      if (w.length === 0) {
        this.newStockTable.length = 0;

          this.updateInfo = true;
          this.updateCheck = false;
          this.clearData();
          setTimeout(function() {
            this.updateInfo = false;
          }.bind(this), 3000);
      } else {
        this.updateInfo = false;
        this.updateCheck = true;
      }

    });
  }

  clearData() {
    this.tds.forEach( d => {
      const tmp = d.nativeElement.children;
      tmp[4].children[0].value = '';
    });
  }
  decimalCheck(el, evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    const number = el.value.split(',');

    if (charCode !== 44 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    if(number.length > 1 && charCode === 44){
      return false;
    }
  }




  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  f7: number = 1;


  key2: string = 'name';
  reverse2: boolean = false;
  sort2(key) {
    this.key2 = key;
    this.reverse2 = !this.reverse2;
  }
  f8: number = 1;

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
