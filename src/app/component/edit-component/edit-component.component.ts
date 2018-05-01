import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Komponent} from '../komponent.model';
import {Types} from '../../enums/types.enum';
import {Store} from '@ngrx/store';
import * as KomponentActions from '../store/komp.actions';
import * as fromKomponent from '../store/komp.reducers';
import {Units} from '../../enums/units.enums';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent implements OnInit {

  komponentForm: FormGroup;


  keys(): Array<string> {
    const keys = Object.keys(Types);
    const w = [];
    for (const e of keys) {
      w.push(Types[e]);
    }
    return w;
  }
  units(): Array<string> {
    const keys = Object.keys(Units);
    const w = [];
    for (const e of keys) {
      w.push(Units[e]);
    }
    return w;
  }


  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromKomponent.FeatureState>) { }

  ngOnInit() {
    this.initForm();

  }


  onNewKomponent() {
  const t = this.komponentForm.value;
  const tmpKomp = new Komponent('test-id', t['name'], t['desc'],
    t['type_1'], t['type_2'], t['type_3']);
  tmpKomp.units = t['units'];
  tmpKomp.weight = t['weight'];
  this.store.dispatch(new KomponentActions.AddKomponent(tmpKomp));
  console.log(this.komponentForm.value);
  this.store.select('kompList').take(1)
    .subscribe( (komState: fromKomponent.State) => {
      const kom = komState.komponents;
      console.log(kom);
    });

  }

  private initForm() {
    const komponentName = '';
    const komponentDesc = '';
    const komponentWeight = '';
    const komponentUnits = '';
    const komponentType1 = '';
    const komponentType2 = '';
    const komponentType3 = '';

    this.komponentForm = new FormGroup({
      'name': new FormControl(komponentName),
      'desc': new FormControl(komponentDesc),
      'weight': new FormControl(komponentWeight),
      'units': new FormControl(komponentUnits),
      'type_1': new FormControl(komponentType1),
      'type_2': new FormControl(komponentType2),
      'type_3': new FormControl(komponentType3)
    });
  }

}

