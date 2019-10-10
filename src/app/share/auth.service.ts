import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {DataService} from "./data.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
  private _serverUrl: string;
  public isLogged: boolean;
  private _session: Subject<string> = new Subject();
  private _sessionValue: string;

  constructor(private http: Http, private dataService: DataService) {
    this.isLogged = this.isLoggedUser();
  }

  public login(user) {
    return this.http.post(this.dataService.serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.login", "params": [
        user.n, user.p]
    }).map((res: Response) => res.json()).toPromise();
  }

  public logOut(session) {
    return this.http.post(this.dataService.serverUrl, {
      "jsonrpc": "2.0", "id": 1, "method": "ults3.logout", "params": [session]
    });
  }

  get session(): string {
    return this._sessionValue;
  }

  public setSession(value: string) {
    this._session.next(value);
    this._sessionValue = value;
  }

  public isLoggedUser() {
    if (sessionStorage.getItem('sessionId')) {
        return this.isLogged = true;
    } else {
      return this.isLogged = false;
    }
  }

}
