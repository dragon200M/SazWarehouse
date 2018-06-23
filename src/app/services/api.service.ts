import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseModel, Warehouses} from '../warehouse/warehouse.model';
import * as data from './api.url';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import {Komponent, NewKomponent} from '../component/komponent.model';
import {StockModel} from '../warehouse-stock/stock.model';
import {RequestOptions, ResponseContentType} from '@angular/http';




@Injectable()
export class ApiService {



  constructor(private httpClient: HttpClient) { }

  getWarehouses(): Observable<Warehouses[]> {
    return this.httpClient.get<Warehouses[]>( data.GET_ALL_WAREHOUSES.url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  saveWarehouse(warehouse: WarehouseModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const tmp: Warehouses = {
      _name: warehouse._name,
      _description: warehouse._description,
      _visibleName: warehouse._visibleName,
      _available: warehouse._available
    };

    return this.httpClient.post( data.ADD_WAREHOUSE.url,
      tmp, {headers , observe: 'body',
        responseType: 'json'}).map((res: Warehouses) => res)
      .catch( err => {
        return Observable.of({error: 'Failure',
          _name: warehouse._name,
          _description: warehouse._description,
          _visibleName: warehouse._visibleName,
          _available: warehouse._available});
      });
  }

  updateWarehouse(warehouse: WarehouseModel, name: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const tmp: Warehouses = {
      _name: warehouse._name,
      _description: warehouse._description,
      _visibleName: warehouse._visibleName,
      _available: warehouse._available
    };

    return this.httpClient.post( data.UPDATE_WAREHOUSE.url + '/' + name,
      tmp, {headers ,
        observe: 'body',
        responseType: 'json'});
  }



  getComponents(): Observable<Komponent[]> {
    return this.httpClient.get<Komponent[]>(data.GET_ALL_COMPONENTS.url, {
      observe: 'body',
      responseType: 'json'});
  }

  getAllParents(child: string): Observable<string[]> {
    return this.httpClient.get<string[]>(data.GET_ALL_PARENTS.url + '/' + child, {
      observe: 'body',
      responseType: 'json'});
  }

  getFreeComponents(): Observable<string[]> {
    return this.httpClient.get<string[]>(data.GET_FREE_COMPONENT.url, {
      observe: 'body',
      responseType: 'json'});
  }

  getComponentByName(name: string) {
    return this.httpClient.get<any>(data.GET_COMPONENT_BY_NAME.url + '/' + name, {
      observe: 'body',
      responseType: 'json'});
  }




  getMainComponents(): Observable<Komponent[]> {
    return this.httpClient.get<Komponent[]>(data.GET_MAIN_COMPONENTS.url, {
      observe: 'body',
      responseType: 'json'});
  }

  getPieceQuantity(lista: UpdateServerList[]) : Observable<UpdateServerList[]> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.put<UpdateServerList[]>(data.GET_PIECE_QUANTITY.url, lista, {headers,
      observe: 'body',
      responseType: 'json'
    });

  }


  getStock(): Observable<StockHolder[]> {
    return this.httpClient.get<StockHolder[]>(data.GET_STOCK.url, {
      observe: 'body',
      responseType: 'json'});
  }

  getStockFile() {
    return data.DOWNLOAD_STOCK_FILE.url;
  }

  saveStock(warehouse: string, komponent: string, quantity: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    return this.httpClient.post( data.ADD_STOCK.url + '/' + warehouse + '/' + komponent + '/' + quantity,
       {
         observe: 'body',
         responseType: 'json'});
  }

  deleteStock(warehouse: string, komponent: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    return this.httpClient.delete( data.DELETE_STOCK.url + '/' + warehouse + '/' + komponent,
      {
        observe: 'body',
        responseType: 'json'});
  }


  getMaxToDo() {
    return this.httpClient.get<ResoultHolder[]>(data.GET_MAX.url, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getRollerMaxToDo() {
    return this.httpClient.get<StockHolder[]>(data.GET_ROLLER_MAX.url, {
      observe: 'body',
      responseType: 'json'
    });
  }


  getStockAll(name: string): Observable<StockModel[]> {


    return this.httpClient.get<StockModel[]>(data.GET_STOCK_ALL.url + '/' + name,{
      observe: 'body',
      responseType: 'json'}
      );
  }

  getStockAllV2(): Observable<StockModel[]> {

    return this.httpClient.get<StockModel[]>(data.GET_STOCK_ALLV2.url,{
      observe: 'body',
      responseType: 'json'}
    );
  }

  getStockByComponent(name: string): Observable<StockModel[]> {

    return this.httpClient.get<StockModel[]>(data.GET_STOCK_BY_COMPONENT.url + '/' + name,{
      observe: 'body',
      responseType: 'json'}
    );
  }

  updateStockList(lista: UpdateServerList[]) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.put<UpdateServerList[]>(data.UPDATE_STOCK_LIST.url, lista, {headers,
      observe: 'body',
      responseType: 'json'
    });

  }
  getStockRecord(start, end) {
    return this.httpClient.get<StockRecords[]>(data.GET_RECORDS.url + '/' + start + '/' + end,{
      observe: 'body',
      responseType: 'json'}
    );
  }

  getKomponentQuantity(parent: string){
    return this.httpClient.get<KomponentQuantity[]>(data.GET_COMP_QUANTITY.url + '/' + parent, {
      observe: 'body',
      responseType: 'json'}
    );
  }



  uploadFiles(files: FileList) {
    let formData = new FormData();

    if ( files.length > 0) {

      for (let i = 0; i < files.length; i++) {

        formData.append('files', files.item(i));

      }

     return this.httpClient.put<UpdateServerList[]>(data.UPLOAD_FILES.url, formData);
    }
    return null;
  }

  uploadFile(file: File) {
    const headers = new HttpHeaders({ 'Content-Type':'multipart/form-data'});

    let formData = new FormData();


     const options = {
       headers, 'method': 'PUT', 'processData': false, 'contentType': false, 'mimeType': 'multipart/form-data',"crossDomain": true
     };

      formData.append('file', file);

     this.httpClient.put<{name: string}>(data.UPLOAD_FILE.url, formData
     ).subscribe(a => console.log(a));



  }


  saveComponent(tmpKomp: Komponent): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const nowy: NewKomponent = {
      _name: tmpKomp._name,
      _description:  tmpKomp._description,
      _sortorder:  tmpKomp._sortorder,
      _material:  tmpKomp._material,
      _typ_1:  tmpKomp._typ_1,
      _typ_2: 'PUSTY',
      _typ_3: 'PUSTY',
      _weight: tmpKomp._weight,
      _dimension_X: tmpKomp._dimension_X,
      _dimension_Y: tmpKomp._dimension_Y,
      _dimension_Z: tmpKomp._dimension_Z,
      _units: tmpKomp._units,
      _childsElement: []
    };


    return this.httpClient.post( data.ADD_COMPONENT.url,
      nowy, {headers , observe: 'body',
        responseType: 'json'}).map((res: NewKomponent) => res)
        .catch( err => {

        return Observable.of({error: 'Failure',
          _name: tmpKomp._name,
          _description:  tmpKomp._description,
          _sortorder:  tmpKomp._sortorder,
          _material:  tmpKomp._material,
          _typ_1:  tmpKomp._typ_1,
          _typ_2: 'PUSTY',
          _typ_3: 'PUSTY',
          _weight: tmpKomp._weight,
          _dimension_X: tmpKomp._dimension_X,
          _dimension_Y: tmpKomp._dimension_Y,
          _dimension_Z: tmpKomp._dimension_Z,
          _units: tmpKomp._units,
          _childsElement: []
        });
      });
  }

  addchildToComponent(parent: string, child: string, quantity: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post<any>(data.ADD_CHILD_COMPONENT.url+'/'+parent+'/'+child+'/'+quantity,{headers , observe: 'body',
      responseType: 'json'}).map((res: any) => res).catch(err => {
        return Observable.of(err);
    }) ;

  }

  deleteChild(parent: string, child: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.delete<any>(data.DELETE_CHILD_COMPONENT.url+'/'+parent+'/'+child,{headers , observe: 'body',
      responseType: 'json'}).map((res: any) => res).catch(err => {
      return Observable.of(err);
    }) ;

  }



  updateComponent(tmpKomp: Komponent, name: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    const nowy: NewKomponent = {
      _name: tmpKomp._name,
      _description:  tmpKomp._description,
      _sortorder:  tmpKomp._sortorder,
      _material:  tmpKomp._material,
      _typ_1:  tmpKomp._typ_1,
      _typ_2: 'PUSTY',
      _typ_3: 'PUSTY',
      _weight: tmpKomp._weight,
      _dimension_X: tmpKomp._dimension_X,
      _dimension_Y: tmpKomp._dimension_Y,
      _dimension_Z: tmpKomp._dimension_Z,
      _units: tmpKomp._units,
      _childsElement: []
    };


    return this.httpClient.post( data.UPDATE_COMPONENT.url + '/' + name,
      nowy, {headers , observe: 'body',
        responseType: 'json'}).map((res: NewKomponent) => res)
        .catch( err => {

        return Observable.of({error: 'Failure',
          _name: tmpKomp._name,
          _description:  tmpKomp._description,
          _sortorder:  tmpKomp._sortorder,
          _material:  tmpKomp._material,
          _typ_1:  tmpKomp._typ_1,
          _typ_2: 'PUSTY',
          _typ_3: 'PUSTY',
          _weight: tmpKomp._weight,
          _dimension_X: tmpKomp._dimension_X,
          _dimension_Y: tmpKomp._dimension_Y,
          _dimension_Z: tmpKomp._dimension_Z,
          _units: tmpKomp._units,
          _childsElement: []
        });
      });
  }


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
interface ResoultHolder {
  komponentModel: string ;
  resoult: number;
}

interface UpdateServerList {
  warehouseName: string;
  komponentName: string;
  oldStock: number;
  newStock: number;
  type: string;
}

interface StockRecords {
  time: string;
  warehouseName: string;
  komponentName: string;
  oldStock: number;
  newStock: number;
  type: string;
}

interface KomponentQuantity{
  komponentName: string;
  quantity: number;
}


















