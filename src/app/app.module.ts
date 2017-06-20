import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';
import { FilterService } from './services/filter.service';
import { SorterService } from './services/sorter.service';
import { TrackByService } from './services/trackby.service';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardCurrent } from './services/auth-guard-current.service';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MessagingComponent } from './messaging/messaging.component';
import { AccountComponent } from './account/account.component';
import { UserListComponent } from './userList/userList.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    MessagingComponent,
    LogoutComponent,
    AccountComponent,
    UserListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    SharedModule,
    HttpModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardCurrent,
    EventService,
    UserService,
    FilterService,
    SorterService,
    TrackByService,
    MessagingService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
