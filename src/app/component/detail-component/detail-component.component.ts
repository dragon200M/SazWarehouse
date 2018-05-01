import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {Observable} from 'rxjs/Observable';
import {Komponent} from '../komponent.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss']
})
export class DetailComponentComponent implements OnInit {
  komponentState: Observable<{komponents: Komponent[]}>;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.komponentState = this.store.select('kompList');
        }
      );
  }

}
