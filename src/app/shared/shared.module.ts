import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatAutocompleteModule,
         MatCheckboxModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatInputModule,
         MatSelectModule,
         MatRadioModule,
         MatMenuModule,
         MatSidenavModule,
         MatToolbarModule,
         MatListModule,
         MatGridListModule,
         MatCardModule,
         MatStepperModule,
         MatTabsModule,
         MatExpansionModule,
         MatButtonModule,
         MatIconModule,
         MatProgressSpinnerModule,
         MatProgressBarModule,
         MatDialogModule,
         MatTooltipModule,
         MatTableModule,
         MatSortModule,
         MatPaginatorModule} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";

const ANGULAR_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule
];

const ANGULAR_MATERIAL_MODULES: any[] = [
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];

import { SearchBarComponent } from "./search-bar/search-bar.component";

import { UniqueValidatorsDirective } from "./unique-validators.directive";

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [SearchBarComponent,UniqueValidatorsDirective],
  exports:[
    ANGULAR_MODULES,
    ANGULAR_MATERIAL_MODULES,
    FlexLayoutModule,
    SearchBarComponent
  ]
})
export class SharedModule { }


/* Import the other Modules in SharedModule if the Modules will be shared through lazy loaded module */