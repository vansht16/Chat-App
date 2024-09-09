import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups = [
    {
      id: 'group1',
      name: 'Group 1',
      users: ['user1', 'user2']
    },
    {
      id: 'group2',
      name: 'Group 2',
      users: ['user3', 'user4']
    }
  ];

  private currentUser = 'user1';  

  getGroupDetailsById(groupId: string) {
    return this.groups.find(group => group.id === groupId);
  }

  getUserGroups() {
    return this.groups.filter(group => group.users.includes(this.currentUser));
  }

  leaveGroup(groupId: string): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.users = group.users.filter(user => user !== this.currentUser);
    }
  }  

  getOtherGroups() {
    return this.groups.filter(group => !group.users.includes(this.currentUser));
  }

  createGroup(groupName: string): void {
    const newGroup = { id: `group${this.groups.length + 1}`, name: groupName, users: [] };
    this.groups.push(newGroup);
  }

  joinGroup(groupName: string, groupId: string): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group && !group.users.includes(this.currentUser)) {
      group.users.push(this.currentUser);
    }
  }
}
