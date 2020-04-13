import { Component, OnInit } from '@angular/core';
import { DroptimeService } from '../droptime.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service'
import { TimeularService } from '../timeular.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  currentuser: User;

  constructor(private droptimeService: DroptimeService, private authenticationService: AuthenticationService, private timeularService: TimeularService)  { }

  ngOnInit(): void {
    this.getUsers();
    this.currentuser = this.authenticationService.currentUserValue;
  }

  getUsers(): void {
    this.droptimeService.getUsers().subscribe(users => this.users = (users as any).users);
  }

  setCurrentUser(user: User){
    this.timeularService.getToken(user.username, user.userpassword).subscribe(token => {
      console.log(token);
      this.authenticationService.setTimeularToken((token as any).token);
      this.authenticationService.setCurrnentUser(user);
      this.currentuser = user;
    });
  }

}
