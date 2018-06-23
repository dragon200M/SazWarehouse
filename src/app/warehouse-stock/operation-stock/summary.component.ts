import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild,
  ViewChildren
} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {ApiService} from '../../services/api.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit, OnDestroy {
  tabledata: MainHolder[];
  tabledata2: RollerHolder[];
  term = '';
  filter = '';


  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) { }

  ngOnInit() {

      let  tmpKomponent = [];
      let  allKomponent = [];
      this.store.select('kompList').subscribe(k => {
        tmpKomponent = k.komponents.filter(d => d._typ_1 === 'GLOWNY');
        allKomponent = k.komponents.filter(d => d._typ_1 !== 'GLOWNY');
        }
      );

    this.api.getMaxToDo().subscribe(
      r => {
       const tMain: MainHolder[] = [];

       r.forEach( e => {
           const c = tmpKomponent.filter(ek => ek._name === e.komponentModel)[0];
           const m: MainHolder = {
             komponentModel: c._name,
             komDesc: c._description,
             types: c._typ_1,
             units: c._units,
             resoult: e.resoult
           };
           tMain.push(m);
         });

       this.tabledata = tMain;


      }
    );

    this.api.getRollerMaxToDo().subscribe(roller =>
      {
       const tRoller: RollerHolder[] = [];
       roller.forEach( t => {
         const rollerK = allKomponent.filter(ek => ek._name === t.komName)[0];
         t.posible.forEach( p => {
           const c = allKomponent.filter(ek => ek._name === p.komponentName)[0];
           const rH: RollerHolder = {
             komponentModel: c._name,
             komDesc: c._description,
             roller: rollerK._name,
             rollerDesc: rollerK._description,
             types: rollerK._typ_1,
             units: rollerK._units,
             resoult: p.posible};
             tRoller.push(rH);
          console.log(rH);
         });
       });



       this.tabledata2 = tRoller;

      });




  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  f5: number = 1;

  key2: string = 'name';
  reverse2: boolean = false;
  sort2(key) {
    this.key2 = key;
    this.reverse2 = !this.reverse2;
  }
  f6: number = 1;

}
interface RollerHolder {
  komponentModel: string;
  komDesc: string;
  roller: string;
  rollerDesc: string;
  types: string;
  units: string;
  resoult: number;
}

interface MainHolder {
  komponentModel: string ;
  komDesc: string;
  types: string;
  units: string;
  resoult: number;
}

interface ResoultHolder {
  komponentModel: string ;
  resoult: number;
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
