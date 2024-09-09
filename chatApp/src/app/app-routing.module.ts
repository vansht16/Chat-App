import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTabComponent } from './admin-tab/admin-tab.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Protect with AuthGuard
  { path: 'admin-tab', component: AdminTabComponent, canActivate: [AuthGuard] },    // Protect with AuthGuard
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },       // Protect with AuthGuard
  { path: 'login', component: LoginComponent },
  { path: 'group-chat/:groupId', component: GroupChatComponent, canActivate: [AuthGuard] }, // Protect group chat
  { path: 'group-chat', component: GroupChatComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
