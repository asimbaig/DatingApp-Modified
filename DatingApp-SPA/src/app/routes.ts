import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MsgsResolver } from './_resolvers/msgs.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailsComponent, resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
              resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MsgsResolver}},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];

// import {Routes} from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { MemberListComponent } from './members/member-list/member-list.component';
// import { MessagesComponent } from './messages/messages.component';
// import { ListsComponent } from './lists/lists.component';
// import { AuthGuard } from './_guards/auth.guard';
// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
// import { MemberCardComponent } from './members/member-card/member-card.component';
// import { MemberDetailsComponent } from './members/member-details/member-details.component';
// import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
// import { MemberListResolver } from './_resolvers/member-list.resolver';
// import { MemberEditComponent } from './members/member-edit/member-edit.component';
// import { MemberEditResolver } from './_resolvers/member-edit.resolver';
// import { ListsResolver } from './_resolvers/lists.resolver';
// import { MessagesResolver } from './_resolvers/messages.resolver';
// // import { MessagesResolver } from './_resolvers/messages.resolver';

// export const appRoutes: Routes = [
//   {path: '', component: HomeComponent},
//   // Guarding multiple routes
//   {
//     path: '',
//     runGuardsAndResolvers: 'always',
//     canActivate: [AuthGuard],
//     children: [
//       {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
//       {path: 'members', component: MemberCardComponent},
//       {path: 'members/:id', component: MemberDetailsComponent, resolve: {user: MemberDetailResolver}},
//       {path: 'member/edit', component: MemberEditComponent,
//                 resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
//       {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
//       {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}}
//     ]
//   },
//   // {path: 'members', component: MemberListComponent, canActivate:[AuthGuard]},
//   // {path: 'messages', component: MessagesComponent},
//   // {path: 'lists', component: ListsComponent},
//   {path: '**', redirectTo: '', pathMatch: 'full'}
// ];
