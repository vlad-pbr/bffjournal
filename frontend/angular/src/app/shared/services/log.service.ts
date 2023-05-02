import { Injectable } from '@angular/core';
import { Log } from '../models/models';
import { UserService } from './user.service';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

const LOGS_URI: string = "/logs"

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[] = []

  constructor(
    private userService: UserService,
    private serverService: ServerService
  ) { }

  create$(log: Log): Observable<unknown> {
    return this.serverService.post$(LOGS_URI, log, this.userService.token!)
  }

  delete$(log: Log): Observable<unknown> {
    return this.serverService.delete$(LOGS_URI, log, this.userService.token!)
  }

  update_logs$(): Observable<Log[]> {
    const logs_request = this.serverService.get$<Log[]>(LOGS_URI, this.userService.token!)

    logs_request.subscribe({
      next: (logs) => { this.logs = logs }
    })

    return logs_request
  }

  clear_logs(): void {
    this.logs = []
  }
}
