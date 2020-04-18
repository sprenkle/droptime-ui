import { Injectable } from '@angular/core';
import { Activity } from './activity'
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class TimeularService {


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getToken(apiKey: string, apiSecret: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    console.log(apiKey + "  " + apiSecret);

    var token = this.http.post<string>("https://api.timeular.com/api/v2/developer/sign-in",
        { apiKey:apiKey, apiSecret: apiSecret }, httpOptions);

    return token;
  }


  getActivities(): Observable<Activity[]> {

    if(!this.authenticationService.currentUserValue)
    {
      return;
    }

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authenticationService.timeularToken
        })
      };

      var activities = this.http.get<Activity[]>("https://api.timeular.com/api/v2/activities", httpOptions);

      return activities;
  }

  addActivity(activity: Activity): Observable<Activity> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.timeularToken
      })
    };

    return this.http.post<Activity>("https://api.timeular.com/api/v2/activities", activity, httpOptions)
      .pipe(
        catchError(this.handleError('addActivity', activity))
      );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.timeularToken
      })
    };

    console.log(activity.id + " " + activity.name + " " + activity.color);

    return this.http.patch<Activity>("https://api.timeular.com/api/v2/activities/" + activity.id, activity, httpOptions)
      .pipe(catchError(this.handleError('addActivity', activity)));
  }



  deleteActivity(activity: Activity): Observable<Activity> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.timeularToken
      })
    };

    var url = "https://api.timeular.com/api/v2/activities/" + activity.id;

    console.log(url);

    return this.http.delete<Activity>(url, httpOptions)
      .pipe(
        catchError(this.handleError('addActivity', activity))
      );
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
