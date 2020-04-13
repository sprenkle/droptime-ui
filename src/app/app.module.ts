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

@NgModule({
  declarations: [
    AppComponent,
    TimularComponent,
    TagsComponent,
    UserComponent,
    TagtoactivityComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
