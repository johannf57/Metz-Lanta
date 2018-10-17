import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  model: any[];

  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent) {
  }

  ngOnInit() {
    this.model = [
      {label: 'Dashboard', icon: '', routerLink: ['/']},
      {label: 'Game 1', icon: '', routerLink: ['/enigm1']},
      {label: 'Game 2', icon: '', routerLink: ['/enigm2']},
      {label: 'Game 3', icon: '', routerLink: ['/enigm3']}
    ];
  }
}
