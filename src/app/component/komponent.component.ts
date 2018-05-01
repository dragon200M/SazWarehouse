import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-komponent',
  templateUrl: './komponent.component.html',
  styleUrls: ['./komponent.component.scss']
})
export class KomponentComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onNewKomponent() {
    this.router.navigate(['new'],
      {relativeTo: this.route});
  }

}
