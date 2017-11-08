import { Component } from '@angular/core';

@Component({
    selector: 'app-loader-spinner',
    template:`
        <div fxLayout >
            <div fxLayoutAlign="center">
                <mat-spinner mode="indeterminate" [diameter]="45" [strokeWidth]="5" color="primary" ></mat-spinner>
            </div>
        </div>
    `
})

export class LoaderSpinnerComponent {
}