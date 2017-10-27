import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootProjects from './../reducers';
import * as projectActions from './../actions/project-table.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { Projects } from "./../models/projects.model";

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html'
})
export class ProjectsFormComponent implements OnInit, OnDestroy {
  subscription : Subscription;
  projectForm : FormGroup;
  selectedProject$ : Observable<Projects>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<ProjectsFormComponent>, private _store$ : Store<fromRootProjects.State>) {  

    this.createForm(); 

    this.selectedProject$ = this._store$.select(fromRootProjects.getCollectionSelectedProject);

  }


  ngOnInit() {
    
    this.subscription = this.selectedProject$.subscribe((response) => {
      if(response != null){

        this.projectForm.setValue({
          projectId   : response.projectId,
          projectCode : response.projectCode,
          projectName : response.projectName
        });

      }
    });

  }
  
  get currentId() { return this.projectForm.get('projectId').value };


  createForm() {
    this.projectForm = this._fb.group({
        projectId    :  [0,Validators.required],
        projectCode  :  [null,Validators.required],
        projectName  :  [null,Validators.required]
    });
  }

  submitForm(){

    this._store$.dispatch( new projectActions.SelectProject(this.projectForm.value) );
    this._store$.dispatch( new projectActions.SaveProject(this.projectForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new projectActions.ClearSelectProject() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
