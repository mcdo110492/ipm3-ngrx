import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent {
}
