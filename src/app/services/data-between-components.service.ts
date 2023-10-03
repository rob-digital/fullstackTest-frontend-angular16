import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBetweenComponentsService {

  public userObject$ = new BehaviorSubject<any|null>(null);
  private user: any = signal([]);

  constructor() { }

  public addUserToUserObject(item: any[]) {
    this.userObject$.next(item)
  }

  public getUserFromUserObject(): Observable<any[]> {
    return this.userObject$
  }

  setNewUser(item: any) {
    this.user.set(item);
  }

  getUser() {
    return this.user();
  }
}
