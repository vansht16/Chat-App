import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminTabComponent } from './admin-tab/admin-tab.component';  
import { NavigationComponent } from './navigation/navigation.component';  
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupChatComponent } from './group-chat/group-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTabComponent,  
    NavigationComponent,  
    DashboardComponent,
    GroupChatComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,  
    MatSidenavModule,  
    MatListModule,     
    MatIconModule,     
    MatToolbarModule,  
    BrowserModule,     
    AppRoutingModule,  
    FormsModule,       
    HttpClientModule   
  ],
  providers: [],  
  bootstrap: [AppComponent]
})
export class AppModule { }
