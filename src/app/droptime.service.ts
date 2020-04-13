import { Injectable } from '@angular/core';
import { Tag } from './tag'
import { User } from './user'
import { TagToAction } from './tagtoaction';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service'


@Injectable({
  providedIn: 'root'
})
export class DroptimeService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  // The solution needs to add these headers to the server response.

  // 'Access-Control-Allow-Origin', '*'
  // 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'

  // tagstoactions
  deleteTagsToActions(tagid: number, actionType: number): Observable<object>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    console.log('delete getTagsToActions');

    return this.http.delete("http://10.0.0.148:5002/tagstoactions/" + actionType + "/" + tagid, httpOptions);
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

    var tagtoactions = this.http.get<TagToAction[]>("http://10.0.0.148:5002/tagstoactions", httpOptions);

    return tagtoactions;
  }

  updateTagsToActions(tagid: number, identifier: number): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var ta: TagToAction =  {tagid: tagid, actiontype: "1", identifier: identifier};

    this.http.post("http://10.0.0.148:5002/tagstoactions", ta, httpOptions).subscribe();
  }

  getLastSeenTag():Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var tag = this.http.get<string>("http://10.0.0.148:5002/lastseentag", httpOptions);

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

    var tags = this.http.get<Tag[]>("http://10.0.0.148:5002/tags/" + this.authenticationService.currentUserValue.userid , httpOptions);

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
    return this.http.delete("http://10.0.0.148:5002/tag/" + tag.tagid, httpOptions);
  }



  getTag(tagid: string): Observable<Tag> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var tag = this.http.get<Tag>("http://10.0.0.148:5002/tag/" + tagid, httpOptions);

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
    return this.http.post("http://10.0.0.148:5002/tag", tag, httpOptions);
  }

  getUsers(): Observable<User[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    var users = this.http.get<User[]>("http://10.0.0.148:5002/users", httpOptions);

    return users;
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
