import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Token, Error } from '../models/models';

const SERVER_ENDPOINT: string = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }

  private format_url(uri: string): string {
    return `${SERVER_ENDPOINT}/${uri.replace(/^\/+|\/+$/, "")}`
  }

  private format_headers(token?: Token) : { [header: string]: string; } | undefined {
    return token ? { token: token!.value } : undefined
  }

  private rewrite_errors$<Type>(o: Observable<Type>) : Observable<Type> {
    return o.pipe(catchError((e: HttpErrorResponse) => throwError(() => e.error as Error)))
  }

  get$<Type>(uri: string, token?: Token): Observable<Type> {
    return this.rewrite_errors$(this.http.get<Type>(
      this.format_url(uri),
      { headers: this.format_headers(token) }))
  }

  post$<Type>(uri: string, body: any, token?: Token): Observable<Type> {
    return this.rewrite_errors$(this.http.post<Type>(
      this.format_url(uri),
      body,
      { headers: this.format_headers(token) }))
  }

  delete$<Type>(uri: string, body: any, token?: Token): Observable<Type> {
    return this.rewrite_errors$(this.http.delete<Type>(
      this.format_url(uri),
      { headers: this.format_headers(token), body: body }))
  }
}
