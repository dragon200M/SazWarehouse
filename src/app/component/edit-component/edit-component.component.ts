import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Komponent} from '../komponent.model';
import {Types} from '../../enums/types.enum';
import {Store} from '@ngrx/store';
import * as KomponentActions from '../store/komp.actions';
import * as fromKomponent from '../store/komp.reducers';
import {Units} from '../../enums/units.enums';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../../services/api.service';
import {init} from 'protractor/built/launcher';

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
  ind2 = -1;
  existsKomp = false;
  validForm = false;
  childKomponents: {element: Komponent, ilosc: number}[];
  isNotSztuka: boolean;
  komponents: Komponent[];
  checkTasma = false;
  checkMaxQuantity = false;
  checkChild = false;
  resoult: any;
  komponentsState: Observable<{komponents: Komponent[]}>;
  komponentsArr: Komponent[];

  checkSortList = [];
  tmpKomponents: Komponent[];
  blockTypeVal = false;
  canSave = false;


  keys(): Array<string> {
    const keys = Object.keys(Types);
    const w = [];
    for (const e of keys) {
      if (e !== 'pusty') {
        w.push(Types[e]);
      }
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
              private store2: Store<fromKomponent.State>,
              private api: ApiService) {}

  ngOnInit() {
    console.log('init edit komponent');
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editable = params['id'] != null ;
        this.blockTypeVal = this.editable;
        this.komponentsState = this.store.select('kompList');
        this.komponentsState.subscribe(el => {
          this.komponentsArr = el.komponents;
        });

        this.initForm();

        if (params['id'] != null) {
          this.childKomponents = [];

            // const tmp = this.komponentsArr.filter(w => w._childsElement.length > 0 && w._name === this.id)[0];

          this.getChilds(this.id);
            // if (undefined !== tmp) {
            //   const a = new Map<string, {element: Komponent, ilosc: number}>();
            //   tmp._childsElement.forEach(item => {
            //     if (!a.get(item._name)) {
            //       a.set(item._name, { element: item, ilosc: 1});
            //     } else {
            //       a.set(item._name, {element: item, ilosc: a.get(item._name).ilosc + 1});
            //     }
            //   });
            //
            //   a.forEach((v, k, m) => {
            //     this.childKomponents.push(v);
            //   });
            // }
        }
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



    if (this.editable ) {

      this.blockTypeVal = true;
      let tmpChilds = [];
          const name = this.komponentsArr.findIndex(w => w._name === tmpKomp._name);
          this.ind = name;
          tmpChilds = this.komponentsArr.filter(k => k._name === tmpKomp._name)[0]._childsElement;



        if ( this.ind > -1 ) {
          this.testPowodzenie = this.store.select('kompList');
          tmpKomp._childsElement.length = 0;
          tmpKomp._childsElement = tmpChilds;
          this.store.dispatch(new KomponentActions.UpdateKomponent({
            index: this.ind,
            updatedKompo: tmpKomp,
            name: tmpKomp._name}));
          this.powodzenie = true;
          setTimeout(function() {
            this.powodzenie = false;
          }.bind(this), 3000);

        }

    } else if (!this.existsKomp && this.komponentForm.controls['name'].valid) {

      this.testPowodzenie = this.store.select('kompList');
      this.store.dispatch(new KomponentActions.StoreKomponent(tmpKomp));
      this.powodzenie = true;

      setTimeout(function() {
        this.powodzenie = false;
        this.initForm();
      }.bind(this), 3000);
    }
   this.validForm = !this.komponentForm.controls['name'].valid;
  }

  private initForm() {
    let komponentName = '';
    let komponentDesc = '';
    let komponentWeight = 0;
    let komponentSortOrder = 0;
    let komponentUnits = 'PIECE';
    let komponentType1 = 'SZTUKA';
    let komponentMaterial = '';
    let kDimensionX = 0.0;
    let kDimensionY = 0.0;
    let kDimensionZ = 0.0;
    let kchilds = [];
    const quantity = 0;
    const gl = false;
    const kp = false;
    const ts = false;
    const sz = false;
    const blokada = false;

    if (this.editable) {

          const ktmp = this.komponentsArr.filter(k => k._name === this.id)[0];
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
          kchilds = [];

          if (ktmp._typ_1 === Types.sztuka) {
            this.isNotSztuka = false;
          } else {
            this.isNotSztuka = true;

            this.api.getAllParents(this.id).subscribe(w => {
              const tmpk = this.komponentsArr.filter(e => e._name === this.id)[0];
              if ( tmpk._typ_1 !== Types.tasma) {
                this.komponents = this.komponentsArr.filter(e => e._name !== ktmp._name && !w.includes(e._name));
                this.komponents.sort( (a, b) => a._name < b._name  ? -1 : a._name > b._name  ? 1 : 0);
                this.tmpKomponents = this.komponents;
              } else {
                this.komponents = this.komponentsArr
                  .filter(e => e._name !== ktmp._name && !w.includes(e._name) && e._typ_1 !== Types.tasma);
                this.komponents.sort( (a, b) => a._name < b._name  ? -1 : a._name > b._name  ? 1 : 0);
                this.tmpKomponents = this.komponents;
              }
            });
          }


    }


    this.komponentForm = new FormGroup({
      'name': new FormControl(komponentName, [Validators.minLength(2), Validators.maxLength(60), Validators.required]),
      'desc': new FormControl(komponentDesc),
      'weight': new FormControl(komponentWeight),
      'units': new FormControl(komponentUnits),
      'type_1': new FormControl(komponentType1),
      'order' : new FormControl(komponentSortOrder),
      'material' : new FormControl(komponentMaterial),
      'dimensionX' : new FormControl(kDimensionX),
      'dimensionY' : new FormControl(kDimensionY),
      'dimensionZ' : new FormControl(kDimensionZ),
      'childs' : new FormControl(kchilds),
      'quantity' : new FormControl(quantity, [Validators.min(0), Validators.max(25), Validators.required]),
      'gl': new FormControl(gl),
      'kp': new FormControl(kp),
      'ts': new FormControl(ts),
      'st': new FormControl(sz),
      'blokada' : new FormControl(blokada),
    });

  }



  focusOutFunction() {
    const tmp = this.komponentForm.value['name'];
    if (tmp.length > 0) {
      this.api.getComponentByName(tmp).subscribe(r => {
        if (!!r) {
          this.existsKomp = true;
          return r;
        } else {
          this.existsKomp = false;
        }
      });
    }
  }

  checkValue(event: any) {
    const check = event.target.checked;
    const val = event.target.value;

    if (check) {
      this.checkSortList.push(val);
    }
    if (!check) {
      const ind = this.checkSortList.indexOf(val);
      if (ind > -1) {
        this.checkSortList.splice(ind,1);
      }
    }

    if (this.checkSortList.length > 0){
      this.tmpKomponents = this.komponents.filter(k => this.checkkey(k._typ_1));
    } else {
      this.tmpKomponents = this.komponents;
    }
    this.tmpKomponents.sort( (a, b) => a._name < b._name  ? -1 : a._name > b._name  ? 1 : 0);
  }

  checkType(event: any) {
    const w = event.target.value;

    if (this.editable) {
      const ktmp2 = this.komponentsArr.filter(k => k._name === this.id)[0];
      if(ktmp2._childsElement.length > 0 && w === 'SZTUKA'){
        this.canSave = true;
      } else {
        this.canSave = false;
      }
    }
  }

  blockType(event: any) {
    const check = event.target.checked;
    this.blockTypeVal = check;

    if(!this.blockTypeVal) {
      this.komponentForm.controls['type_1'].enable();
    } else {
      this.komponentForm.controls['type_1'].disable();
    }
  }


  checkkey(typ: Types) {
    const tmp = this.checkSortList.findIndex(el => el === typ);
    if (tmp > -1) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {

  }

  addChilds() {
    const val = this.komponentForm.controls['childs'].value;
    const q = this.komponentForm.controls['quantity'].value;

    if (val.length === 0) {
      this.checkChild = true;
    } else {
      this.checkChild = false;
    }

    let updatedKomponent;
    let temp;


        const ktmp = this.komponentsArr.filter(k => k._name === this.id)[0];
        temp = ktmp;
        const name = this.komponentsArr.findIndex(w => w._name === ktmp._name);
        this.ind2 = name;


        if (ktmp._typ_1 === Types.tasma && q > 1) {
          this.checkTasma = true;
        } else {
          this.checkTasma = false;
        }
        // if ( q > 25) {
        //   this.checkMaxQuantity = true;
        //   console.log(q);
        // } else {
        //   this.checkMaxQuantity = false;
        // }

        if (val.length > 0 && q > 0 && !this.checkTasma && !this.checkMaxQuantity) {
          this.api.addchildToComponent(ktmp._name, val, q).subscribe(w => {

            if (null != w['resoult']) {
              if (w['resoult'] === 'Success') {

                this.komponentForm.controls['quantity'].reset();
                this.komponentForm.controls['childs'].reset();

                if ( this.ind2 > 0) {

                  this.api.getComponentByName(temp._name).subscribe(r => {
                     updatedKomponent = r;

                    this.store.dispatch(new KomponentActions.UpdateOneKomponent({
                      index: 0,
                      updatedKompo: updatedKomponent,
                      name: updatedKomponent._name}
                    ));
                    this.childKomponents.splice(0, this.childKomponents.length);
                    // const a = new Map<string, {element: Komponent, ilosc: number}>();
                    // updatedKomponent._childsElement.forEach(item => {
                    //   if (!a.get(item._name)) {
                    //     a.set(item._name, { element: item, ilosc: 1});
                    //   } else {
                    //     a.set(item._name, {element: item, ilosc: a.get(item._name).ilosc + 1});
                    //   }
                    // });
                    //
                    // a.forEach((v, k, m) => {
                    //   this.childKomponents.push(v);
                    // });

                    this.getChilds(updatedKomponent._name);
                  });
                }}}});
          }
  }

  removeChilds() {
    const val = this.komponentForm.controls['childs'].value;
    const komp = this.komponentsArr.filter(el => el._name === this.id)[0];

    const r = komp._childsElement.findIndex(w => w._name === val);

    let updatedKomponent;
    if(r > -1){
      this.api.deleteChild(komp._name, val).subscribe(w => {

        if (null != w['resoult']) {
          if (w['resoult'] === 'Success') {
            this.komponentForm.controls['quantity'].reset();
            this.komponentForm.controls['childs'].reset();


            this.api.getComponentByName(komp._name).subscribe(r1 => {
              updatedKomponent = r1;

              this.store.dispatch(new KomponentActions.UpdateOneKomponent({
                  index: 0,
                  updatedKompo: updatedKomponent,
                  name: updatedKomponent._name
                }
              ));
              this.childKomponents.splice(0, this.childKomponents.length);
              this.getChilds(updatedKomponent._name);
              // const a = new Map<string, {element: Komponent, ilosc: number}>();
              // updatedKomponent._childsElement.forEach(item => {
              //   if (!a.get(item._name)) {
              //     a.set(item._name, { element: item, ilosc: 1});
              //   } else {
              //     a.set(item._name, {element: item, ilosc: a.get(item._name).ilosc + 1});
              //   }
              // });
              // a.forEach((v, k, m) => {
              //   this.childKomponents.push(v);
              // });
            });
          }
        }
      });

    }
  }


  getChilds(parent: string){
    if(undefined !== parent){
      this.api.getKomponentQuantity(parent).subscribe(
        el => {
          const q: KomponentQuantity[] = el;
          const kom = [];
          q.forEach(el1 => kom.push(el1.komponentName));
          const wynik = this.komponentsArr.filter(w1 => kom.includes(w1._name));
          wynik.forEach(w2 => {
            q.forEach(k2 => {
              if (k2.komponentName === w2._name){
                this.childKomponents.push({element: w2, ilosc: k2.quantity});
              }
            });
          });
        });
    }
  }


  groupElement(k: Komponent) {

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

interface KomponentQuantity{
  komponentName: string;
  quantity: number;
}
