import { Component, OnInit } from '@angular/core';
import { DroptimeService } from '../droptime.service';
import { TagToAction } from '../tagtoaction';
import { Activity } from '../activity';
import { Tag } from '../Tag';
import {TimeularService} from '../timeular.service';


@Component({
  selector: 'app-tagtoactivity',
  templateUrl: './tagtoactivity.component.html',
  styleUrls: ['./tagtoactivity.component.css']
})

export class TagtoactivityComponent implements OnInit {

  tagid: number;
  actiontype: string;
  identifier: number;

  tagtoactionsDict: {[index: number]: number} = {};
  activities: Activity[];
  tags: Tag[] ;

  constructor(private droptimeService: DroptimeService, private timeularService: TimeularService) { }

  ngOnInit(): void {
    this.getTagToActions();
    this.getActivities();
    this.getTags();
  }

  getTagToActions(): void {
    this.droptimeService.getTagsToActions().subscribe(tagtoactions => {
      var tta = (tagtoactions as any).tagstoactions;
      tta.forEach(element => {
        this.tagtoactionsDict[element.tagid] = element.identifier;
      });
      console.log(this.tagtoactionsDict[23]);
    });
  }

  deleteTagsToActions(tagid: number, actiontype: number): void {
    this.droptimeService.deleteTagsToActions(tagid, actiontype).subscribe(x => {
      this.getTagToActions();
    });

  }

  getActivities(): void {
    this.timeularService.getActivities().subscribe(activities => this.activities = (activities as any).activities);
    console.log("GetActivities done");
  }

  getTags(): void {
    this.droptimeService.getTags().subscribe(tags => this.tags = (tags as any).tags);
    console.log("GetTags done");
  }

  delete(tagid: number): void {
    console.log(tagid);
  }

  update(tagid: number): void {
    console.log("update " + tagid + " " + this.tagtoactionsDict[tagid]);
    this.droptimeService.updateTagsToActions(tagid, this.tagtoactionsDict[tagid]);
  }

  getSelectedValue(tagid: number, event): void {
    this.tagtoactionsDict[tagid] = event.target.value;
  }
}
