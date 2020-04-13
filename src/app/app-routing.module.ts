import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimularComponent} from './timular/timular.component'
import { TagsComponent } from './tags/tags.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TagtoactivityComponent } from './tagtoactivity/tagtoactivity.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
                        { path: '', component: UserComponent},
                        { path: 'login', component: UserComponent},
                        { path: 'timeular', component: TimularComponent, canActivate: [AuthGuard] },
                        { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
                        { path: 'tagtoactivity', component: TagtoactivityComponent, canActivate: [AuthGuard] },
                        { path: 'users', component: UserComponent }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
