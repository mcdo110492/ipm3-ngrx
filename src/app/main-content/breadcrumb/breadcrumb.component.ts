import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  subscription : Subscription
  urlRouterState : Observable<any>;
  breadcrumbs : any[] = [];

  constructor(private _store : Store<any>){
    this.urlRouterState = this._store.select('routerReducer');
  }
  
  ngOnInit(){

    this.subscription = this.urlRouterState
      .subscribe((response) => {
        if(response != undefined){
          const str = response.state.url;
          this.breadcrumbs = str.split("/");
        }
      });
     

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
