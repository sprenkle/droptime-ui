import { Injectable } from '@angular/core';
import { Tag } from './tag'
import { User } from './user'
import { TagToAction } from './tagtoaction';
import { Reminder } from './reminder';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service'
import { DropTimeActivity } from './droptimeactivity'
import { Device } from './device'


@Injectable({
  providedIn: 'root'
})
export class DroptimeService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

   }

   //baseUrl:string = "http://10.0.0.166:5002";
   baseUrl:string = "http://10.0.0.148:5002";
  // The solution needs to add these headers to the server response.

  // 'Access-Control-Allow-Origin', '*'
  // 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'

  // tagstoactions
  getDevices(): Observable<Device[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log('calling getDevices');

    return this.http.get<Device[]>(this.baseUrl + "/devices", httpOptions);
  }

  deleteTagsToActions(tagid: number, actionType: number): Observable<object>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log('delete getTagsToActions');
    console.log(actionType, tagid);
    return this.http.delete(this.baseUrl + "/tagstoactions/" + actionType + "/" + tagid, httpOptions);
  }

  getTagsToActions(): Observable<TagToAction[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log('calling getTagsToActions');

    var tagtoactions = this.http.get<TagToAction[]>(this.baseUrl + "/tagstoactions", httpOptions);

    return tagtoactions;
  }

  getDropTimeActivity(activityId: string): Observable<DropTimeActivity>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log('calling getDropTimeActivity');

    return this.http.get<DropTimeActivity>(this.baseUrl + "/activities/" + activityId, httpOptions);
  }

  updateDropTimeActivity(droptTimeActivity: DropTimeActivity)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log('calling updateDropTimeActivity');
    console.log(droptTimeActivity);

    this.http.post(this.baseUrl + "/activities", droptTimeActivity, httpOptions).subscribe();
  }

  updateTagsToActions(tagid: number, actionType: string, identifier: number): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var ta: TagToAction =  {tagid: tagid, actiontype: actionType, identifier: identifier};

    this.http.post(this.baseUrl + "/tagstoactions", ta, httpOptions).subscribe();
  }

  getLastSeenTag():Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var tag = this.http.get<string>(this.baseUrl + "/lastseentag", httpOptions);

    return tag;
  }

  getTags(): Observable<Tag[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var tags = this.http.get<Tag[]>(this.baseUrl + "/tags/" + this.authenticationService.currentUserValue.userid , httpOptions);

    return tags;
  }

  deleteTag(tag: Tag): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log(tag);
    return this.http.delete(this.baseUrl + "/tag/" + tag.tagid, httpOptions);
  }

  getTag(tagid: string): Observable<Tag> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var tag = this.http.get<Tag>(this.baseUrl + "/tag/" + tagid, httpOptions);

    return tag;
  }


  updateTag(tag: Tag): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log(tag);
    return this.http.post(this.baseUrl + "/tag", tag, httpOptions);
  }

  getUsers(): Observable<User[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var users = this.http.get<User[]>(this.baseUrl + "/users", httpOptions);

    return users;
  }

  getReminders(userId: string): Observable<Reminder[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var reminders = this.http.get<Reminder[]>(this.baseUrl + "/reminders/" + userId, httpOptions);

    return reminders;
  }

  saveReminder(reminder: Reminder): Observable<object>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    reminder.showled = reminder.showled ? 1 : 0;
    reminder.sunday = reminder.sunday ? 1 : 0;
    reminder.monday = reminder.monday ? 1 : 0;
    reminder.tuesday = reminder.tuesday ? 1 : 0;
    reminder.wednesday = reminder.wednesday ? 1 : 0;
    reminder.thursday = reminder.thursday ? 1 : 0;
    reminder.friday = reminder.friday ? 1 : 0;
    reminder.saturday = reminder.saturday ? 1 : 0;

    return this.http.post(this.baseUrl + "/reminders", reminder, httpOptions);
  }

  deleteReminder(reminder: Reminder): Observable<object>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    return this.http.delete(this.baseUrl + "/reminders/delete/" + reminder.reminderid, httpOptions);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
