import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { JwtModule } from '@auth0/angular-jwt';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgxGalleryModule} from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MsgsResolver } from './_resolvers/msgs.resolver';

import { AppComponent } from './app.component';
import { ValuesComponent } from './Values/Values.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';

import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';

export function tokenGetter()
{
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
   declarations: [
      AppComponent,
      ValuesComponent,
      NavComponent,
      HomeComponent,
      // TimeAgoPipe,
      RegisterComponent,
      MemberListComponent,
      MemberDetailsComponent,
      MemberCardComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      ListsComponent,
      MessagesComponent,
      MemberMessagesComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
        config:
        {
          tokenGetter,
          whitelistedDomains : ['localhost:5000'],
          blacklistedRoutes : ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChanges,
      ListsResolver,
      MsgsResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
