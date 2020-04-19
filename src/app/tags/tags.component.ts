import { Component, OnInit } from '@angular/core';
import { Tag } from '../Tag';
import { DroptimeService } from '../droptime.service';
import { AuthenticationService } from '../authentication.service'


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] ;
  lasttag: string;
  selectedtag: Tag;
  last_device: string;

  constructor(private droptimeService: DroptimeService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getTags();
    this.getLastTag();
  }

  getTags(): void {
    this.droptimeService.getTags().subscribe(tags => this.tags = (tags as any).tags);
    console.log("GetTags done");
  }

  getLastTag(): void {
    this.droptimeService.getLastSeenTag().subscribe(last_seen => {
      this.lasttag = (last_seen as any).last_tag;
      this.last_device = (last_seen as any).last_device;
      this.droptimeService.getTag(this.lasttag).subscribe(tag => {
        console.log("tag =");
        console.log(tag);
        if(!tag['tagid']){
          console.log("NO TAG______________");
          this.selectedtag = {tagid:Number(this.lasttag), userid:this.authenticationService.currentUserValue.userid, name:"", description:"" };
        }
        else
        {
          this.selectedtag =tag;
        }
      });
    });
  }

  onSelect(tag: Tag): void {
    this.selectedtag = tag;
  }

  updateTag(tag: Tag): void {
    console.log("test");
    console.log(tag);
    this.droptimeService.updateTag(tag).subscribe(x => this.getTags());
  }

  deleteTag(tag: Tag): void {
    this.droptimeService.deleteTag(tag).subscribe(x => this.getTags());
  }

}
