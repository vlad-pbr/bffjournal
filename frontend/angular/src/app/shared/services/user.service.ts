import { Injectable } from '@angular/core';
import { User, Token } from '../models/models';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

const USERS_URI: string = "/users"
const AUTH_URI: string = "/auth"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User = undefined
  token?: Token = undefined

  constructor(private serverService: ServerService) { }

  login$(user: User): Observable<Token> {
    const login_result$ = this.serverService.post$<Token>(AUTH_URI, user)
    
    login_result$.subscribe({
      next: (token) => {
        this.user = user
        this.token = token
      }
    })

    return login_result$
  }

  create$(user: User): Observable<unknown> {
    return this.serverService.post$(USERS_URI, user)
  }

  logout(): void {
    this.user = undefined
    this.token = undefined
  }
}
