import { Component } from '@angular/core';

import { Store } from "@ngrx/store";
import * as mainActions from './../actions/main-content.actions';
import * as fromMain from './../reducers/main-content.reducers';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  
  constructor(private _store : Store<fromMain.State>) {}

  toggleSidenav(){
    this._store.dispatch( new mainActions.SidenavToggle() );
  }

}
