import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Komponent} from '../komponent.model';
import {Types} from '../../enums/types.enum';
import {Store} from '@ngrx/store';
import * as KomponentActions from '../store/komp.actions';
import * as fromKomponent from '../store/komp.reducers';
import {Units} from '../../enums/units.enums';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {async} from '@angular/core/testing';
import {DataserviceService} from '../../services/dataservice.service';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {ApiService} from '../../services/api.service';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent implements OnInit, OnDestroy {
  id: string;
  komponentForm: FormGroup;
  editable: boolean;
  errors = false;
  powodzenie = false;
  testPowodzenie: Observable<{errors: boolean}>;
  ind = -1;

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
              private store: Store<fromKomponent.FeatureState>,
              private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editable = params['id'] != null ;
        this.initForm();
      }
    );



  }



  onNewKomponent() {
    const t = this.komponentForm.value;
    const tmpKomp = new Komponent(t['name'], t['name'], t['desc'],
      t['type_1'],  Types.pusty, Types.pusty);
    tmpKomp._units = t['units'];
    tmpKomp._weight = t['weight'];
    tmpKomp._dimension_X = t['dimensionX'];
    tmpKomp._dimension_Y = t['dimensionY'];
    tmpKomp._dimension_Z = t['dimensionZ'];
    tmpKomp._sortorder = t['order'];
    tmpKomp._material = t['material'];

    if (this.editable) {
      this.store.select('kompList').subscribe(
        el => {
          const name = el.komponents.findIndex(w => w._name === tmpKomp._name);
          this.ind = name;
        });

        if ( this.ind > -1 ) {
          this.testPowodzenie = this.store.select('kompList');
          this.store.dispatch(new KomponentActions.UpdateKomponent({
            index: this.ind,
            updatedKompo: tmpKomp,
            name: tmpKomp._name}));
          this.powodzenie = true;
          setTimeout(function() {
            this.powodzenie = false;
          }.bind(this), 3000);

        }

    } else {
      this.testPowodzenie = this.store.select('kompList');
      this.store.dispatch(new KomponentActions.StoreKomponent(tmpKomp));
      this.powodzenie = true;
      setTimeout(function() {
        this.powodzenie = false;
      }.bind(this), 3000);
    }

  }

  private initForm() {
    let komponentName = '';
    let komponentDesc = '';
    let komponentWeight = 0;
    let komponentSortOrder = 0;
    let komponentUnits = '';
    let komponentType1 = '';
    let komponentMaterial = '';
    let kDimensionX = 0.0;
    let kDimensionY = 0.0;
    let kDimensionZ = 0.0;
    let kchilds = '';

    if (this.editable) {
      this.store.select('kompList').take(1)
        .subscribe( (kState: fromKomponent.State) => {
          const ktmp = kState.komponents.filter(k => k._name === this.id)[0];
          komponentName = ktmp._name;
          komponentDesc = ktmp._description;
          komponentWeight = ktmp._weight;
          komponentUnits = ktmp._units;
          komponentType1 = ktmp._typ_1;
          komponentSortOrder = ktmp._sortorder;
          komponentMaterial = ktmp._material;
          kDimensionX = ktmp._dimension_X;
          kDimensionY = ktmp._dimension_Y;
          kDimensionZ = ktmp._dimension_Z;
          kchilds = '';
        });

    }


    this.komponentForm = new FormGroup({
      'name': new FormControl(komponentName),
      'desc': new FormControl(komponentDesc),
      'weight': new FormControl(komponentWeight),
      'units': new FormControl(komponentUnits),
      'type_1': new FormControl(komponentType1),
      'order' : new FormControl(komponentSortOrder),
      'material' : new FormControl(komponentMaterial, Validators.compose([
        Validators.required, this.materialValidator
      ])),
      'dimensionX' : new FormControl(kDimensionX),
      'dimensionY' : new FormControl(kDimensionY),
      'dimensionZ' : new FormControl(kDimensionZ)
    });

  }

  materialValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^[1-9]{1,3}\.[0-9]{1,2}x[1-9]{1,2}\.[0-9]{1,2}\s{1,3}./)) {
      return {invalidMat: true};
    }
  }

  ngOnDestroy() {

  }


}

interface NewKomponent {
   _name: string;
   _description: string;
   _sortorder: number;
   _material: string;
   _typ_1: string;
   _typ_2: string;
   _typ_3: string;
   _weight: number;
   _dimension_X: number;
   _dimension_Y: number;
   _dimension_Z: number;
   _units: string;
   _childsElement: NewKomponent[];
}

