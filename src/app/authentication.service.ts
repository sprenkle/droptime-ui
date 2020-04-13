import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserValue : User;
  timeularToken : string;

  constructor() { }

  setCurrnentUser(user: User): void{
    this.currentUserValue = user;
  }

  setTimeularToken(token: string): void{
    this.timeularToken = token;
  }
}
