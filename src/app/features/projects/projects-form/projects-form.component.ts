import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootProjects from './../reducers';
import * as projectActions from './../actions/project-table.actions';

import { Observable } from 'rxjs/Observable';


import { Projects } from "./../models/projects.model";

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html'
})
export class ProjectsFormComponent implements OnInit {

  projectForm : FormGroup;
  selectedProject$ : Observable<Projects>;
  isSaveLoading$   : Observable<boolean>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<ProjectsFormComponent>, private _store$ : Store<fromRootProjects.State>) {  

    this.createForm(); 

    this.selectedProject$ = this._store$.select(fromRootProjects.getCollectionSelectedProject);
    this.isSaveLoading$   = this._store$.select(fromRootProjects.getCollectionIsSaveLoading);

  }


  ngOnInit() {
    
    this.selectedProject$.subscribe((response) => {
      if(response != null){
        this.projectForm.setValue({
          projectId   : response.projectId,
          projectCode : response.projectCode,
          projectName : response.projectName
        });
      }
    });

  }


  createForm() {
    this.projectForm = this._fb.group({
        projectId    :  [0,Validators.required],
        projectCode  :  [null,Validators.required],
        projectName  :  [null,Validators.required]
    });
  }

  submitForm(){

    this._store$.dispatch( new projectActions.SaveProject(this.projectForm.value) );
    
  }

  closeDialog(){

    this._store$.dispatch( new projectActions.ClearSelectProject() );
    this._dialogRef.close();

  }


}
