import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminTabComponent } from './admin-tab/admin-tab.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { GroupChatComponent } from './group-chat/group-chat.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-tab', component: AdminTabComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'group-chat/:groupId', component: GroupChatComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
