import { Component, OnInit } from '@angular/core';
import {Activity} from '../activity';
import {TimeularService} from '../timeular.service';

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

  constructor(private timeularService: TimeularService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  onSelect(activity: Activity): void {
    this.selectedActivity = activity;
    this.isAddActivity = false;
  }

  getActivities(): void {
    this.timeularService.getActivities().subscribe(activities => this.activities = (activities as any).activities);
    console.log("GetActivities done");
  }

  updateName(activity: Activity): void {
    console.log(activity.name);
    activity.color = this.color;
    console.log(activity.color);
    this.timeularService.updateActivity(activity).subscribe(activities => this.activities = (activities as any).activities);
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
