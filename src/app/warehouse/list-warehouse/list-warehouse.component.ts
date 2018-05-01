import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {WarehouseModel} from '../warehouse.model';

@Component({
  selector: 'app-list-warehouse',
  templateUrl: './list-warehouse.component.html',
  styleUrls: ['./list-warehouse.component.scss']
})
export class ListWarehouseComponent implements OnInit {
  @Input() war;
  test = new Subject<WarehouseModel>();
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  listClick(s: string) {
    this.war.subscribe(
      (p: any) => {
        this.test = p.warehouses.filter(w => w.name === s)[0];
      }

    );
  }
  onAddElementToWarehouse(s: string) {
    this.listClick(s);
    this.router.navigate([s + '/addStock'],
      {relativeTo: this.route});
  }

}
