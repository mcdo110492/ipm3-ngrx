import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromMain from './../reducers/main-content.reducers';
import * as mainActions from './../actions/main-content.actions';

import { sidenavMetaData, sidenavMetaData2 } from "./../sidenav/sidenav.metadata";

import { LoaderSpinnerService } from "./../services/loader-spinner/loader-spinner.service";

@Component({
  selector: 'app-feature-content',
  templateUrl: './feature-content.component.html',
  styleUrls: ['./feature-content.component.scss']
})
export class FeatureContentComponent implements OnInit {
  searchText :string;
  constructor(private _store : Store<fromMain.State>) { }

  ngOnInit() {
  }

  changeLinks1(){
    this._store.dispatch(new mainActions.OpenLoaderSpinner() );
    this.searchText = 'search click';
    setTimeout(() => {
      this._store.dispatch(new mainActions.CloseLoaderSpinner() );
    },5000);
  }

  loginPage(){
    this._store.dispatch( new mainActions.IsLoginPage(true) );
  }

  searchBar(event){
    console.log(event);
  }


}
