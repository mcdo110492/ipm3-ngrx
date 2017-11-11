import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  @Input() query = '';
  @Output() search : EventEmitter<string> = new EventEmitter<string>();
}
