import { Component, Input } from '@angular/core';
import { Log } from '../shared/models/models';
import { LogService } from '../shared/services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  @Input() log?: Log

  formatDate(epoch_seconds: number): string {
    return new Date(epoch_seconds * 1000).toString()
  }
}
