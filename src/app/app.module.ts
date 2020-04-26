import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TimularComponent } from './timular/timular.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { TagsComponent } from './tags/tags.component';
import { UserComponent } from './user/user.component';
import { TagtoactivityComponent } from './tagtoactivity/tagtoactivity.component';
import { LoginComponent } from './login/login.component';
import { RemindersComponent } from './reminders/reminders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TagtoreminderComponent } from './tagtoreminder/tagtoreminder.component';

@NgModule({
  declarations: [
    AppComponent,
    TimularComponent,
    TagsComponent,
    UserComponent,
    TagtoactivityComponent,
    LoginComponent,
    RemindersComponent,
    TagtoreminderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
