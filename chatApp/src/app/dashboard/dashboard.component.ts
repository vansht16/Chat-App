import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  groupName: string = '';
  userGroups: any[] = [];
  otherGroups: any[] = [];

  constructor(private groupService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserGroups();
    this.fetchOtherGroups();
  }

  fetchUserGroups(): void {
    this.userGroups = this.groupService.getUserGroups();
  }

  fetchOtherGroups(): void {
    this.otherGroups = this.groupService.getOtherGroups();
  }

  createGroup(): void {
    if (this.groupName.trim()) {
      this.groupService.createGroup(this.groupName);
      this.groupName = '';
      this.fetchOtherGroups();
    }
  }

  enterGroup(groupId: string): void {
    this.router.navigate(['/group-chat', groupId]);
  }

  joinGroup(groupName: string, groupId: string): void {
    this.groupService.joinGroup(groupName, groupId);
    this.fetchUserGroups();
    this.fetchOtherGroups();
  }

  leaveGroup(groupId: string): void {
    this.groupService.leaveGroup(groupId);
    this.fetchUserGroups();
    this.fetchOtherGroups();
  }
}
