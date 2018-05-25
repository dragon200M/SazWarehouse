import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {Observable} from 'rxjs/Observable';
import {Komponent} from '../komponent.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataserviceService} from '../../services/dataservice.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss']
})
export class DetailComponentComponent implements OnInit,OnDestroy {
  komponentState: Observable<{komponents: Komponent[]}>;
  tmpk:Komponent;
  id: number;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private ds: DataserviceService) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          console.log(this.id);
          // this.komponentState = this.store.select('kompList');
        }
      );
   this.subscription = this.ds.getData().subscribe(w => {
      console.log(w);
      this.tmpk = w;
    });
  }

  ngOnDestroy() {
    console.log('destroy detail');
    this.ds.clearData();
    this.subscription.unsubscribe();
  }

}
