import { Component, OnInit, OnChanges ,OnDestroy, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnDestroy, OnChanges {
  //Subscribers
  subscription : Subscription;
  // Form Group of Search Form
  searchForm : FormGroup;

  constructor( private _fb: FormBuilder ){ 

    //Create a Form Method to instantiate your reactive form
    this.createForm();
    
  }

  //Event Stream that will exposed the search value
  @Output() searchEvent : EventEmitter<string> = new EventEmitter<string>();
  //Input for search text for the state
  @Input() searchText : string;

  ngOnInit(){

    /**
     * Subscribe to reactive forms every valueChanges event
     * Wait 300ms to emit the value to avoid excessive emit of request
     * And emit the distinct value only using rxjs distinctUntilChanged to avoid repeat value emission
     */
    this.subscription = this.searchForm
        .valueChanges
        .distinctUntilChanged()
        .debounceTime(300)
        .subscribe( data => this.searchEvent.emit(data.search) );

  }

  ngOnChanges(){
    this.searchForm.patchValue({
      search : this.searchText
    });
  }

  ngOnDestroy(){
    //OnDestroy unsubscribe to all subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }
  

  createForm(){
    this.searchForm = this._fb.group({
      search : ''
    });
  }

}
