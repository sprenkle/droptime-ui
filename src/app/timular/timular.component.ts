import { Component, OnInit } from '@angular/core';
import {Activity} from '../activity';
import {DropTimeActivity} from '../droptimeactivity';
import {TimeularService} from '../timeular.service';
import { DroptimeService } from '../droptime.service';
import { AuthenticationService } from '../authentication.service'



@Component({
  selector: 'app-timular',
  templateUrl: './timular.component.html',
  styleUrls: ['./timular.component.css']
})

export class TimularComponent implements OnInit {
  activities: Activity[];
  selectedActivity: Activity;
  addedActivity: string;
  isAddActivity: boolean;
  color: string;
  selectedDropTimeActivity: DropTimeActivity;

  constructor(private timeularService: TimeularService, private droptimeService: DroptimeService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  onSelect(activity: Activity): void {

    this.droptimeService.getDropTimeActivity(activity.id.toString()).subscribe(x =>
      {
        console.log("getDropTimeActivity");
        this.selectedActivity = activity;
        this.isAddActivity = false;
        this.selectedDropTimeActivity = x;
        this.selectedDropTimeActivity.color = activity.color;
        this.selectedDropTimeActivity.name = activity.name;


        console.log(x);
      }, (err) => {
        console.log(err);
        this.selectedActivity = activity;
        this.isAddActivity = false;
        this.selectedDropTimeActivity = {activityid: activity.id.toString(),
          userid: this.authenticationService.currentUserValue.userid, name: activity.name, color: activity.color, show: 1, dailyGoals: 0, dailytimeSec: 0};
        console.log(this.selectedDropTimeActivity);
        });
  }


  getActivities(): void {
    this.timeularService.getActivities().subscribe(activities => this.activities = (activities as any).activities);
    console.log("GetActivities done");
  }

  updateActivity(activity: Activity): void {
    console.log(activity.name);
    activity.color = this.color;
    console.log(activity.color);

    //this.timeularService.updateActivity(activity).subscribe(activities => this.getActivities());
    this.droptimeService.updateDropTimeActivity(this.selectedDropTimeActivity);
  }

  delete(activity: Activity): void{
    console.log(activity.id);
    this.selectedActivity = null;
    this.timeularService.deleteActivity(activity).subscribe(activities => this.activities = (activities as any).activities);
  }

  add(): void {
    this.isAddActivity = false;
    var activity = {id: null, name: this.addedActivity, color: this.color, integration:'zei'}
    console.log(this.color)

    this.timeularService.addActivity(activity).subscribe(activities => this.activities = (activities as any).activities);
  }

  addActivity(): void {
    this.isAddActivity = true;
    this.selectedActivity = null;

  }
}
