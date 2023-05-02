import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../shared/models/models';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  @Input() log?: Log
  @Output() delete = new EventEmitter<Log>()

  formatDate(epoch_seconds: number): string {
    return new Date(epoch_seconds * 1000).toString()
  }
}
