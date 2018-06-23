import {Component, OnInit, ViewChild} from '@angular/core';
import {ITreeOptions, TreeComponent, TreeModel} from 'angular-tree-component';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Komponent} from '../../component/komponent.model';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild('tree') treeComponent: TreeComponent;

  komponentName = '';
  editable = false;

  nodes: Komponent[];
  options: ITreeOptions = {
    idField: '_name',
    displayField: '_name',
    childrenField: '_childsElement',
    useVirtualScroll: true,
    nodeHeight: 10
  };

  constructor(private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {

    this.store.select('kompList').subscribe(
      (kom) => {
        this.nodes = kom.komponents.filter( p => p._typ_1 !== 'SZTUKA');
      }
    );
  }


  prints() {
    const treeModel: TreeModel = this.treeComponent.treeModel;


  }

  onEvent(event) {
    this.komponentName = event.node.data._name;
    this.editable = true;
  }

}



