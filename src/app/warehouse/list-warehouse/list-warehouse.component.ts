import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {WarehouseModel} from '../warehouse.model';

@Component({
  selector: 'app-list-warehouse',
  templateUrl: './list-warehouse.component.html',
  styleUrls: ['./list-warehouse.component.scss']
})
export class ListWarehouseComponent implements OnInit, OnDestroy {
  @Input() war;

  filter = '';
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }



  onAddElementToWarehouse(s: string) {
    this.router.navigate([s + '/addStock'],
      {relativeTo: this.route});
  }
  ngOnDestroy() {

  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;


}
