import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import * as JWT from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({

  providedIn: 'root'
})
export class EndpointsService {
  apiUrl = environment.baseURl;
  accessToken: string = localStorage.getItem('token');
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userLoggedIn = new BehaviorSubject(false);
  constructor(private http: HttpClient,
    private router: Router) { }
  authorizeUser() {
    debugger
    if (this.userToken) {
      if (this.router.url == "/login" || this.router.url == "/register") {

        this.router.navigate(['']);
      }
      this.setLoggedIn(true);
    }
    else {
      if (!(this.router.url == "/login" || this.router.url == "/register")) {
        this.router.navigate(["login"]);
      }
      else {
        this.router.navigate([this.router.url]);

      }
      this.setLoggedIn(false);
    }
  }
  getAccessToken() {
    return this.accessToken = localStorage.getItem('token');
  }
  get userToken() {
    if (this.getAccessToken()) {
      return JWT(this.accessToken);
    }
    else {
      return "";
    }
  }

  set setUserToken(data) {
    localStorage.setItem('token', data);
  }
  get getUserId() {

    return JWT(this.getAccessToken()).adminResult.id;
  }
  get getUserName() {
    return JWT(this.getAccessToken()).adminResult.firstName;
  }
  get getUserLastName() {
    return JWT(this.getAccessToken()).adminResult.lastName;
  }
  get getRoleId() {
    return JWT(this.getAccessToken()).adminResult.roleId;
  }
  getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  getLoggedInValue(): boolean {
    return this.userLoggedIn.getValue();
  }

  setLoggedIn(val: boolean) {
    this.userLoggedIn.next(val);
  }

  logout() {
    localStorage.removeItem('token');
  }
  getPromise(endPoint) {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + endPoint).subscribe(res => {
        resolve(res)
      })
    })
  }
  editPromise(endPoint, payload) {
    return new Promise((resolve) => {
      this.http.put(this.apiUrl + endPoint, payload).subscribe(res => {
        resolve(res);
      })
    })
  }
  getPromiseParams(endPoint, data) {
    return new Promise((resolve) => {
      this.http.get(this.apiUrl + endPoint, {
        params: data
      }).subscribe(res => {
        resolve(res)
      })
    })
  }
  postPromise(endpoint, payload) {
    return new Promise((resolve) => {
      this.http.post(this.apiUrl + endpoint, payload).subscribe(res => {
        resolve(res)
      })
    })
  }
  edittask(payload) {
    return this.http.put(this.apiUrl + `task/editTask/${payload.id}`, payload)
  }
  viewEmployeeTrack(payload, token) {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.apiUrl}tracking/getUserTrack/${payload.userId}/${payload.date}`, {
      headers: headers
    })
  }
}
