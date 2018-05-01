import { Component, OnInit, Input } from '@angular/core';
import {Komponent} from '../../komponent.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
   @Input() komponent: Komponent;
   @Input() index: number;
  constructor() { }

  ngOnInit() {

  }

}
