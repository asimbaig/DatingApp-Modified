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
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/HasRole.directive';
import { AdminService } from './_services/admin.service';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { PhotoManagmentComponent } from './admin/photo-managment/photo-managment.component';

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
      MemberMessagesComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      PhotoManagmentComponent,
      RolesModalComponent
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
      ModalModule.forRoot(),
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
      AdminService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   entryComponents: [
    RolesModalComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
